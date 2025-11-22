import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entity/character.entity';
import { CharacterAttribute } from './entity/character-attribute.entity';
import { Inventory } from './entity/inventory.entity';
import { CharacterService } from './service/character.service';
import { CharacterBusiness } from './business/character.business';
import { CharacterController } from './controller/character.controller';
import { Game } from '../games/entity/game.entity';
import { User } from '../user/entity/user.entity';
import { Attribute } from '../games/entity/attribute.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Character,
      CharacterAttribute,
      Inventory,
      Game,
      User,
      Attribute,
    ]),
  ],
  controllers: [CharacterController],
  providers: [CharacterService, CharacterBusiness],
  exports: [CharacterBusiness],
})
export class CharacterModule {}
