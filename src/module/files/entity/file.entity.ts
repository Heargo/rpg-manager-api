import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @Column('bytea')
  file: Buffer;

  @Column()
  sizeInBytes: number;
}
