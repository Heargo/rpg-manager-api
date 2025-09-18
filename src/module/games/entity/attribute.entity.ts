import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Attribute {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  maxValue: number;

  @ApiProperty()
  @Column({ nullable: true })
  dynamic: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  color: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'float', default: 1 })
  statsPointCost: number;

  @ApiProperty()
  @ManyToOne(() => Game, {
    nullable: false,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  game: Game;
}
