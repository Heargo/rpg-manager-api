import { ApiProperty } from '@nestjs/swagger';

export class AuthPayload {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;
}
