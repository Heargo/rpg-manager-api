import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../characters/entity/character.entity';
import { Game } from '../../games/entity/game.entity';

@Entity()
export class Effect {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  duration: number;

  @ApiProperty()
  @ManyToOne(() => Game, { nullable: false })
  game: Game;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  attributeModifiers: { attributeId: string; modifier: number }[];
}
