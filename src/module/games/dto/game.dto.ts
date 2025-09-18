import { ApiProperty } from '@nestjs/swagger';
import { PublicUserDto } from '../../user/dto/user.dto';
import { AttributeDto } from './attribute.dto';
import { File } from '../../files/entity/file.entity';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

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
  @Type(() => Array<AttributeDto>)
  @IsArray()
  @ValidateNested({ each: true })
  attributes: AttributeDto[];

  @ApiProperty()
  imageId: string;
}

export class CreateUpdateGameDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  startingStatsPoints: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  startingMoney: number;

  @ApiProperty({ isArray: true, type: () => [AttributeDto] })
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : JSON.parse(value);
  })
  @IsArray()
  @ValidateNested({ each: true })
  attributes: AttributeDto[];

  @ApiProperty({ required: false, type: () => File })
  @IsOptional()
  image?: Partial<File>;
}
