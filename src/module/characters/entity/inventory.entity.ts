import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Character } from '../../characters/entity/character.entity';
import { Item } from '../../items/entity/item.entity';

@Entity()
export class Inventory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => Character, { nullable: false })
  character: Character;

  @ApiProperty()
  @ManyToOne(() => Item, { nullable: false })
  item: Item;

  @ApiProperty()
  @Column()
  quantity: number;
}
