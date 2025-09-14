import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Attribute } from './attribute.entity';

@Entity()
export class Game {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => User, { nullable: false })
  gameMaster: User;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  startingStatsPoints: number;

  @ApiProperty()
  @Column({ nullable: true })
  startingMoney: number;

  @ApiProperty()
  @OneToMany(() => Attribute, (attribute) => attribute.game)
  attributes: Attribute[];
}
