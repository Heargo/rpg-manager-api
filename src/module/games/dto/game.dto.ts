import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../../user/dto/user.dto';
import { AttributeDto } from './attribute.dto';
import { File } from '../../files/entity/file.entity';

export class GameDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gameMaster: PublicUserDto;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  startingStatsPoints: number;

  @ApiProperty()
  startingMoney: number;

  @ApiProperty({ isArray: true, type: () => [AttributeDto] })
  attributes: AttributeDto[];

  @ApiProperty()
  imageId: string;
}

export class CreateUpdateGameDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  startingStatsPoints: number;

  @ApiProperty()
  startingMoney: number;

  @ApiProperty({ isArray: true, type: () => [AttributeDto] })
  attributes: AttributeDto[];

  @ApiProperty({ required: false, type: () => File })
  image?: Partial<File>;
}
