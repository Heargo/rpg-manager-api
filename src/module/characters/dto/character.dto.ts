import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { PublicUserDto } from '../../user/dto/user.dto';
import { AttributeDto } from '../../games/dto/attribute.dto';
import { File } from '../../files/entity/file.entity';

export class CharacterPreviewDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  user?: PublicUserDto;

  @ApiProperty({ required: false })
  imageId?: string;
}

export class CharacterAttributeDto {
  @ApiProperty({ type: () => AttributeDto })
  attribute: AttributeDto;

  @ApiProperty()
  investedStatPoints: number;

  @ApiProperty({ required: false })
  dynamicValue?: number;
}

export class CharacterDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  gameId: string;

  @ApiProperty({ type: () => PublicUserDto })
  user: PublicUserDto;

  @ApiProperty({ isArray: true, type: () => [CharacterAttributeDto] })
  @Type(() => Array<CharacterAttributeDto>)
  attributes: CharacterAttributeDto[];
}

export class CharacterAttributeCreateUpdateDto {
  @ApiProperty()
  attributeId: string;

  @ApiProperty()
  investedStatPoints: number;

  @ApiProperty({ required: false })
  dynamicValue?: number;
}

export class CreateUpdateCharacterDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  gameId: string;

  @ApiProperty({
    isArray: true,
    required: false,
    type: () => [CharacterAttributeCreateUpdateDto],
  })
  @Transform(({ value }) => {
    if (!value) return [];
    return Array.isArray(value) ? value : JSON.parse(value);
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterAttributeCreateUpdateDto)
  attributes?: CharacterAttributeCreateUpdateDto[] = [];

  @ApiProperty({ required: false, type: () => File })
  @IsOptional()
  image?: Partial<File>;
}
