import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from '../entity/game.entity';
import { Repository } from 'typeorm';
import { CreateUpdateGameDto } from '../dto/game.dto';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async create(
    gameMaster: User,
    createGameDto: CreateUpdateGameDto,
  ): Promise<Game> {
    return this.gameRepository.save({
      name: createGameDto.name,
      gameMaster,
      description: createGameDto.description,
      startingStatsPoints: createGameDto.startingStatsPoints,
      startingMoney: createGameDto.startingMoney,
      attributes: createGameDto.attributes,
      image: createGameDto.image,
    });
  }

  async findByGameMaster(gameMasterId: string): Promise<Game[]> {
    return this.gameRepository.find({
      where: { gameMaster: { id: gameMasterId } },
      relations: ['gameMaster', 'attributes'],
    });
  }

  async findById(id: string): Promise<Game> {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['gameMaster', 'attributes'],
    });
  }

  async update(id: string, updateGameDto: CreateUpdateGameDto): Promise<Game> {
    await this.gameRepository.save({
      id: id,
      name: updateGameDto.name,
      description: updateGameDto.description,
      startingStatsPoints: updateGameDto.startingStatsPoints,
      startingMoney: updateGameDto.startingMoney,
      attributes: updateGameDto.attributes,
      image: updateGameDto.image,
    });
    return this.gameRepository.findOne({
      where: { id },
      relations: ['attributes', 'gameMaster'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
