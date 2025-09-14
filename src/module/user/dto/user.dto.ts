import { ApiProperty } from '@nestjs/swagger';

export class PublicUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;
}
