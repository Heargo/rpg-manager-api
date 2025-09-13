import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from './character.entity';
import { Effect } from '../../effects/entity/effect.entity';

@Entity()
export class CharacterEffect {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Character, { nullable: false })
  character: Character;

  @ApiProperty()
  @ManyToOne(() => Effect, { nullable: false })
  effect: Effect;

  @ApiProperty()
  @Column()
  turnsRemaining: number;
}
