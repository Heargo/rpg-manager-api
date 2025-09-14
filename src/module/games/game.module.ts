import { Module } from '@nestjs/common';
import { Game } from './entity/game.entity';
import { Attribute } from './entity/attribute.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../../common/common.module';
import { GameController } from './controller/game.controller';
import { GameService } from './service/game.service';
import { GameBusiness } from './business/game.business';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Attribute]), CommonModule],
  controllers: [GameController],
  providers: [GameService, GameBusiness],
  exports: [GameBusiness],
})
export class GameModule {}
