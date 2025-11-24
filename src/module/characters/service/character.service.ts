import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Character } from '../entity/character.entity';
import { CharacterAttribute } from '../entity/character-attribute.entity';
import { CreateUpdateCharacterDto } from '../dto/character.dto';
import { User } from '../../user/entity/user.entity';
import { Game } from '../../games/entity/game.entity';
import { Attribute } from '../../games/entity/attribute.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(CharacterAttribute)
    private readonly characterAttributeRepository: Repository<CharacterAttribute>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
  ) {}

  async findAllByGameId(gameId: string): Promise<Character[]> {
    return this.characterRepository.find({
      where: { game: { id: gameId } },
      relations: ['user'],
      select: ['id', 'name', 'description', 'imageId'],
    });
  }

  async findByGameIdAndId(gameId: string, id: string): Promise<Character> {
    return this.characterRepository.findOne({
      where: { id, game: { id: gameId } },
      relations: ['game', 'user', 'attributes', 'attributes.attribute'],
    });
  }

  async findById(id: string): Promise<Character> {
    return this.characterRepository.findOne({
      where: { id },
      relations: ['game', 'user', 'attributes', 'attributes.attribute'],
    });
  }

  async create(owner: User, dto: CreateUpdateCharacterDto): Promise<Character> {
    const game = await this.gameRepository.findOne({
      where: { id: dto.gameId },
    });
    const user = await this.userRepository.findOne({ where: { id: owner.id } });

    const character = this.characterRepository.create({
      name: dto.name,
      description: dto.description,
      image: dto.image,
      game,
      user,
    });
    const saved = await this.characterRepository.save(character);

    const attributes = await this.attributeRepository.find({
      where: { game: { id: dto.gameId } },
    });
    const charAttributes = attributes.map((a) =>
      this.characterAttributeRepository.create({
        character: saved,
        attribute: a,
        investedStatPoints: 0,
        dynamicValue: 0,
      }),
    );

    //if attributes provided in dto, override the defaults values
    if (dto.attributes && dto.attributes.length > 0) {
      for (const attrDto of dto.attributes) {
        const charAttr = charAttributes.find(
          (ca) => ca.attribute.id === attrDto.attributeId,
        );
        if (charAttr) {
          charAttr.investedStatPoints = attrDto.investedStatPoints ?? 0;
          charAttr.dynamicValue = attrDto.dynamicValue ?? 0;
        }
      }
    }

    await this.characterAttributeRepository.save(charAttributes);

    // return the newly created character
    return this.findById(saved.id);
  }

  async update(id: string, dto: CreateUpdateCharacterDto): Promise<Character> {
    const existing = await this.findById(id);

    if (dto.name !== undefined) existing.name = dto.name;
    if (dto.description !== undefined) existing.description = dto.description;

    if (dto.gameId && dto.gameId !== existing.game.id) {
      const game = await this.gameRepository.findOne({
        where: { id: dto.gameId },
      });
      existing.game = game;
    }

    // upsert attributes if provided
    if (dto.attributes) {
      // remove existing then insert new for simplicity
      if (existing.attributes?.length) {
        await this.characterAttributeRepository.remove(existing.attributes);
      }
      if (dto.attributes.length) {
        const attributes = await this.attributeRepository.find({
          where: { id: In(dto.attributes.map((a) => a.attributeId)) },
        });
        const attrMap = new Map(attributes.map((a) => [a.id, a] as const));
        const charAttributes = dto.attributes.map((a) =>
          this.characterAttributeRepository.create({
            character: existing,
            attribute: attrMap.get(a.attributeId),
            investedStatPoints: a.investedStatPoints ?? 0,
            dynamicValue: a.dynamicValue ?? 0,
          }),
        );
        existing.attributes =
          await this.characterAttributeRepository.save(charAttributes);
      } else {
        existing.attributes = [];
      }
    }

    await this.characterRepository.save(existing);
    return this.findById(existing.id);
  }
}
