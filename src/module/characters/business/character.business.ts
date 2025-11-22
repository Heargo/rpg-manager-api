import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CharacterService } from '../service/character.service';
import { CreateUpdateCharacterDto } from '../dto/character.dto';
import { User } from '../../user/entity/user.entity';
import { FilesHelper } from '../../files/helper/file.helper';

@Injectable()
export class CharacterBusiness {
  constructor(
    @Inject(CharacterService)
    private readonly characterService: CharacterService,
  ) {}

  async listByGame(gameId: string) {
    if (!gameId) {
      throw new HttpException('gameId is required', HttpStatus.BAD_REQUEST);
    }
    return this.characterService.findAllByGameId(gameId);
  }

  async getFull(gameId: string, id: string) {
    const character = await this.characterService.findByGameIdAndId(gameId, id);
    if (!character) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
    }
    return character;
  }

  async create(
    owner: User,
    dto: CreateUpdateCharacterDto,
    profilePicture: Express.Multer.File,
  ) {
    if (!dto.gameId) {
      throw new HttpException('gameId is required', HttpStatus.BAD_REQUEST);
    }
    //compress image before saving
    if (profilePicture) {
      const imageBuffer = FilesHelper.convertToBuffer(profilePicture);
      if (!FilesHelper.isBufferSizeValid(imageBuffer)) {
        throw new HttpException(
          'Image size exceeds the limit',
          HttpStatus.BAD_REQUEST,
        );
      }
      dto.image = {
        name: profilePicture.originalname,
        file: await FilesHelper.compressImage(imageBuffer),
        mimeType: profilePicture.mimetype,
        sizeInBytes: Buffer.byteLength(imageBuffer),
      };
    }
    return this.characterService.create(owner, dto);
  }

  async update(id: string, requester: User, dto: CreateUpdateCharacterDto) {
    const existing = await this.characterService.findById(id);
    if (!existing) {
      throw new HttpException('Character not found', HttpStatus.NOT_FOUND);
    }
    // Only owner can update for now (could be extended with GM permissions)
    if (existing.user.id !== requester.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.characterService.update(id, dto);
  }
}
