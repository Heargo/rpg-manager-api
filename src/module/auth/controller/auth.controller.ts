import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { AuthParameters } from '../dtos/auth-parameters';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthPayload } from '../dtos/auth-payload';
import { TokenPayload } from '../dtos/token-payload';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({ type: AuthPayload })
  @ApiNotAcceptableResponse({ description: 'User already exist' })
  async register(@Body() params: AuthParameters): Promise<AuthPayload> {
    try {
      return this.authService.register(params.login, params.password);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('login')
  @ApiAcceptedResponse({ type: TokenPayload })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  async login(@Body() params: AuthParameters): Promise<TokenPayload> {
    try {
      return this.authService.login(params.login, params.password);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <token>',
  })
  @ApiAcceptedResponse({ description: 'User authenticated' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async auth() {
    return { message: 'User authenticated' };
  }
}
