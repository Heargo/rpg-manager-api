import { GameDto } from '../dto/game.dto';
import { Game } from '../entity/game.entity';

export class GameMapper {
  static toGameDto(game: Game): GameDto {
    return {
      ...game,
    };
  }

  static toGameDtoArray(games: Game[]): GameDto[] {
    return games.map((game) => this.toGameDto(game));
  }
}
