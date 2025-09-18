import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Attribute } from '../../games/entity/attribute.entity';
import { Character } from './character.entity';

@Entity()
export class CharacterAttribute {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Character, { nullable: false })
  character: Character;

  @ApiProperty()
  @ManyToOne(() => Attribute, { nullable: false, eager: true })
  attribute: Attribute;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  investedStatPoints: number;

  @ApiProperty()
  @Column({ nullable: true, type: 'float', default: 0 })
  dynamicValue?: number;
}
