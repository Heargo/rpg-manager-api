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
  Param,
  Patch,
  HttpException,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GameBusiness } from '../business/game.business';
import { CreateUpdateGameDto, GameDto } from '../dto/game.dto';
import { User } from '../../user/entity/user.entity';
import { GameMapper } from '../mapper/game.mapper';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidator } from '../../../common/validators/file.validator';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id') id: string): Promise<GameDto> {
    const game = await this.gameBusiness.getGameById(id);
    return GameMapper.toGameDto(game);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateGameDto: CreateUpdateGameDto,
    @Request() req,
    @UploadedFile(
      new FileValidator({
        required: false,
        maxSize: 5000000,
        allowedTypes: ['image/'],
      }),
    )
    image?: Express.Multer.File,
  ): Promise<GameDto> {
    const user: User = req.user;
    // User can only update their own games (as game master)
    const game = await this.gameBusiness.getGameById(id);
    if (user.id !== game.gameMaster.id) {
      throw new HttpException('Forbidden', 403);
    }
    const updatedGame = await this.gameBusiness.updateGame(
      id,
      updateGameDto,
      image,
    );
    return GameMapper.toGameDto(updatedGame);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req): Promise<void> {
    const user: User = req.user;
    // User can only delete their own games (as game master)
    const game = await this.gameBusiness.getGameById(id);
    if (user.id !== game.gameMaster.id) {
      throw new HttpException('Forbidden', 403);
    }
    return this.gameBusiness.deleteGame(id);
  }
}
