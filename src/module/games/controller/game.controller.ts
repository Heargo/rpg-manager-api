import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Inject,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { GameBusiness } from '../business/game.business';
import { CreateUpdateGameDto, GameDto } from '../dto/game.dto';
import { User } from '../../user/entity/user.entity';
import { GameMapper } from '../mapper/game.mapper';

@ApiTags('games')
@Controller('games')
@UseGuards(JwtAuthGuard)
export class GameController {
  constructor(
    @Inject(GameBusiness) private readonly gameBusiness: GameBusiness,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createGameDto: CreateUpdateGameDto,
    @Request() req,
  ): Promise<GameDto> {
    const user: User = req.user;
    const game = await this.gameBusiness.createGame(user, createGameDto);
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
