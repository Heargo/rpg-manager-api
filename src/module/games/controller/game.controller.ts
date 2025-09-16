import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  Request,
  UploadedFile,
  UseInterceptors,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GameBusiness } from '../business/game.business';
import { CreateUpdateGameDto, GameDto } from '../dto/game.dto';
import { User } from '../../user/entity/user.entity';
import { GameMapper } from '../mapper/game.mapper';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('games')
@Controller('games')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(
    @Inject(GameBusiness) private readonly gameBusiness: GameBusiness,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createGameDto: CreateUpdateGameDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }), // max size is 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Request() req,
  ): Promise<GameDto> {
    const user: User = req.user;
    createGameDto.attributes = Array.isArray(createGameDto.attributes)
      ? createGameDto.attributes
      : [];
    const game = await this.gameBusiness.createGame(user, createGameDto, image);
    return GameMapper.toGameDto(game);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async get(@Request() req): Promise<GameDto[]> {
    const user: User = req.user;
    const games = await this.gameBusiness.getGamesByUserId(user.id);
    return GameMapper.toGameDtoArray(games);
  }
}
