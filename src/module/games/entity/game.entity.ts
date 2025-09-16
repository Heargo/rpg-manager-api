import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Attribute } from './attribute.entity';
import { File } from '../../../common/entity/file.entity';

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
  @Column({ nullable: true, type: 'int', default: 0 })
  startingStatsPoints: number;

  @ApiProperty()
  @Column({ nullable: true, type: 'float', default: 0 })
  startingMoney: number;

  @ApiProperty()
  @OneToMany(() => Attribute, (attribute) => attribute.game, { cascade: true })
  attributes: Attribute[];

  @ApiProperty()
  @OneToOne(() => File, { nullable: true, cascade: true, eager: false })
  image: File;
}
