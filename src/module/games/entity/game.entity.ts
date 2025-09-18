import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Attribute } from './attribute.entity';
import { File } from '../../files/entity/file.entity';

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
  @OneToMany(() => Attribute, (attribute) => attribute.game, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
    eager: true,
  })
  attributes: Attribute[];

  @ApiProperty()
  @OneToOne(() => File, { nullable: true, cascade: true })
  @JoinColumn({ name: 'imageId' })
  image: File;

  // imageId
  @ApiProperty()
  @Column({ name: 'imageId', nullable: true })
  imageId: string;
}
