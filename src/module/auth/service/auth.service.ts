import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthPayload } from '../dtos/auth-payload';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/service/user.service';
import { TokenPayload } from '../dtos/token-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(login: string, password: string): Promise<AuthPayload> {
    //encode password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    let response: AuthPayload;
    try {
      let res = await this.userService.create({
        login: login,
        password: hash,
      });
      response = {
        id: res.id,
        login: res.login,
      };
    } catch (error) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }

    return response;
  }

  async login(login: string, password: string): Promise<TokenPayload> {
    if (!login || !password) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }
    let user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //compare password
    const passwordHash = await this.userService.getPasswordHash(user.id);
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    //generate token
    const token = this.jwtService.sign({ sub: user.id });

    return {
      token: token,
    };
  }
}
