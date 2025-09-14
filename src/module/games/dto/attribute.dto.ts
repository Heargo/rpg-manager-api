// Data Transfer Object for Attribute entity

import { ApiProperty } from '@nestjs/swagger';

export class AttributeDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  maxValue: number;
}
