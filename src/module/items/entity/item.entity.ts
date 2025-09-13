import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from '../../games/entity/game.entity';
import { Effect } from '../../effects/entity/effect.entity';

export enum ItemType {
  CONSUMABLE = 'consumable',
  EQUIPMENT = 'equipment',
  MISC = 'misc',
}
export enum EffectTarget {
  SELF = 'self',
  TARGET = 'target',
  AREA = 'area',
}

//TODO: make slots customizable in game settings
export enum Slot {
  HEAD = 'head',
  BODY = 'body',
  LEGS = 'legs',
  FEET = 'feet',
  HANDS = 'hands',
  WEAPON = 'weapon',
  SHIELD = 'shield',
  RING = 'ring',
  AMULET = 'amulet',
  EARING = 'earing',
}

@Entity()
export class Item {
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
  rarity: number; //TODO : make it customable (label,icon,color)

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ItemType,
  })
  type: ItemType;

  @ApiProperty()
  @Column()
  marketValue: number;

  @ApiProperty()
  @ManyToOne(() => Game, { nullable: false })
  game: Game;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  attributeModifiers: { attributeId: string; modifier: number }[];

  @ApiProperty()
  @ManyToMany(() => Effect, { nullable: true })
  effectsWhenUsed: Effect[];

  @ApiProperty()
  @ManyToMany(() => Effect, { nullable: true })
  effectsWhenEquipped: Effect[];

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: EffectTarget,
  })
  effectTarget: EffectTarget;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Slot,
  })
  slot: Slot;
}
