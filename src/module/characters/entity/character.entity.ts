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
import { Game } from '../../games/entity/game.entity';
import { User } from '../../user/entity/user.entity';
import { CharacterAttribute } from './character-attribute.entity';
import { File } from '../../files/entity/file.entity';

@Entity()
export class Character {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @ManyToOne(() => Game, { nullable: false })
  game: Game;

  @ApiProperty()
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @OneToMany(
    () => CharacterAttribute,
    (characterAttribute) => characterAttribute.character,
    { cascade: true, eager: true },
  )
  attributes: CharacterAttribute[];

  @ApiProperty()
  @OneToOne(() => File, { nullable: true, cascade: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'imageId' })
  image: File;

  // imageId
  @ApiProperty()
  @Column({ name: 'imageId', nullable: true })
  imageId: string;
}
