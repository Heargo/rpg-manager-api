// Data Transfer Object for Attribute entity

import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class AttributeDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  maxValue: number;

  @ApiProperty()
  @IsBoolean()
  dynamic: boolean;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsNumber()
  statsPointCost: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  gameId?: string;
}
