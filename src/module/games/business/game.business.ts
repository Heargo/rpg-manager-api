import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUpdateGameDto } from '../dto/game.dto';
import { GameService } from '../service/game.service';
import { User } from '../../user/entity/user.entity';
import { FileHelper } from '../../files/helper/file.helper';
import { FileBusiness } from '../../files/business/file.business';

@Injectable()
export class GameBusiness {
  // Business logic methods would go here

  constructor(
    @Inject(GameService) private gameService: GameService,
    @Inject(FileBusiness) private fileBusiness: FileBusiness,
  ) {}

  public async createGame(
    gameMaster: User,
    game: CreateUpdateGameDto,
    image?: Express.Multer.File,
  ) {
    //compress image before saving
    if (image) {
      const imageBuffer = FileHelper.convertToBuffer(image);
      if (!FileHelper.isBufferSizeValid(imageBuffer)) {
        throw new HttpException(
          'Image size exceeds the limit',
          HttpStatus.BAD_REQUEST,
        );
      }
      game.image = {
        name: image.originalname,
        file: await FileHelper.compressImage(imageBuffer),
        mimeType: image.mimetype,
        sizeInBytes: Buffer.byteLength(imageBuffer),
      };
    }
    return this.gameService.create(gameMaster, game);
  }

  public async updateGame(
    id: string,
    game: CreateUpdateGameDto,
    image: Express.Multer.File,
  ) {
    const existingGame = await this.gameService.findById(id);

    let existingImageId: string | undefined;
    // if image is provided, compress it before saving
    if (image) {
      const imageBuffer = FileHelper.convertToBuffer(image);
      if (!FileHelper.isBufferSizeValid(imageBuffer)) {
        throw new HttpException(
          'Image size exceeds the limit',
          HttpStatus.BAD_REQUEST,
        );
      }
      game.image = {
        name: image.originalname,
        file: await FileHelper.compressImage(imageBuffer),
        mimeType: image.mimetype,
        sizeInBytes: Buffer.byteLength(imageBuffer),
      };
      existingImageId = existingGame?.image?.id;
    }

    const updatedGame = await this.gameService.update(id, game);
    //after the game is updated then delete the old image from the database
    if (existingImageId) {
      await this.fileBusiness.deleteById(existingImageId);
    }
    return updatedGame;
  }

  public async getGameById(id: string) {
    return this.gameService.findById(id);
  }

  public async getGamesByUserId(userId: string) {
    const gamesAsGameMaster = await this.gameService.findByGameMaster(userId);
    return gamesAsGameMaster;
  }
}
