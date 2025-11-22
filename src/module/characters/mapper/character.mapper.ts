import { Character } from '../entity/character.entity';
import {
  CharacterAttributeDto,
  CharacterDto,
  CharacterPreviewDto,
} from '../dto/character.dto';

export class CharacterMapper {
  static toPreviewDto(c: Character): CharacterPreviewDto {
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      user: c.user
        ? { id: c.user.id, login: (c.user as any).login }
        : undefined,
      imageId: c.imageId,
    };
  }

  static toDto(c: Character): CharacterDto {
    const attributes: CharacterAttributeDto[] = (c.attributes || []).map(
      (a) => ({
        attribute: {
          id: a.attribute.id,
          name: a.attribute.name,
          maxValue: a.attribute.maxValue,
          dynamic: a.attribute.dynamic,
          color: a.attribute.color,
          statsPointCost: a.attribute.statsPointCost,
        },
        investedStatPoints: a.investedStatPoints,
        dynamicValue: a.dynamicValue,
      }),
    );
    return {
      id: c.id,
      name: c.name,
      description: c.description,
      gameId: c.game?.id,
      user: c.user
        ? { id: c.user.id, login: (c.user as any).login }
        : undefined,
      attributes,
      imageId: c.imageId,
    } as CharacterDto;
  }
}
