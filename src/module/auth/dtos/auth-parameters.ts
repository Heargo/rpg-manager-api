import { ApiProperty } from '@nestjs/swagger';

export class AuthParameters {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
