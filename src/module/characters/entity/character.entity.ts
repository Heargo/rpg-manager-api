import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entity/game.entity';
import { User } from '../../user/entity/user.entity';

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
}
