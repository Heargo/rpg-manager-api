import { GameDto } from '../dto/game.dto';
import { Game } from '../entity/game.entity';
import { AttributeMapper } from './attribute.mapper';

export class GameMapper {
  static toGameDto(game: Game): GameDto {
    return {
      id: game.id,
      name: game.name,
      gameMaster: game.gameMaster,
      description: game.description,
      startingStatsPoints: game.startingStatsPoints,
      startingMoney: game.startingMoney,
      attributes: AttributeMapper.toAttributeDtoArray(game.attributes),
      imageId: game.image?.id,
    };
  }

  static toGameDtoArray(games: Game[]): GameDto[] {
    return games.map((game) => this.toGameDto(game));
  }
}
