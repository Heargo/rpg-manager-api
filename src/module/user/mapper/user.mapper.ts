import { PublicUserDto } from '../dto/user.dto';
import { User } from '../entity/user.entity';

export class UserMapper {
  static toPublicUserDto(user: User): PublicUserDto {
    const { id, login } = user;
    return { id, login };
  }
}
