import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUpdateGameDto } from '../dto/game.dto';
import { GameService } from '../service/game.service';
import { User } from '../../user/entity/user.entity';
import { FileHelper } from '../../../common/helper/file.helper';

@Injectable()
export class GameBusiness {
  // Business logic methods would go here

  constructor(@Inject(GameService) private gameService: GameService) {}

  public async createGame(gameMaster: User, game: CreateUpdateGameDto) {
    //compress image before saving
    if (game.image) {
      if (!FileHelper.isBufferSizeValid(game.image)) {
        throw new HttpException(
          'Image size exceeds the limit',
          HttpStatus.BAD_REQUEST,
        );
      }
      game.image = FileHelper.compressImage(game.image);
    }
    return this.gameService.create(gameMaster, game);
  }

  public async updateGame(id: string, game: CreateUpdateGameDto) {
    return this.gameService.update(id, game);
  }

  public async getGameById(id: string) {
    return this.gameService.findById(id);
  }

  public async getGamesByUserId(userId: string) {
    //TODO (all game the user is part of and game he is master of)
    return [];
  }
}
