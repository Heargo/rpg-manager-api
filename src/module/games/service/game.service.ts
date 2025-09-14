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
    return this.gameRepository.save({ ...createGameDto, gameMaster });
  }

  async findByGameMaster(gameMasterId: string): Promise<Game[]> {
    return this.gameRepository.find({
      where: { gameMaster: { id: gameMasterId } },
      relations: ['gameMaster'],
    });
  }

  async findById(id: string): Promise<Game> {
    return this.gameRepository.findOne({
      where: { id },
      relations: ['gameMaster'],
    });
  }

  async update(id: string, updateGameDto: CreateUpdateGameDto): Promise<Game> {
    await this.gameRepository.update(id, updateGameDto);
    return this.gameRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    Logger.warn(`Not implemented: remove game ${id}`);
  }
}
