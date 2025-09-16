import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { HttpModule } from '@nestjs/axios';
import { CommonModule } from './common/common.module';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { GameModule } from './module/games/game.module';
import { FileModule } from './module/files/file.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HttpModule,
    AuthModule,
    UserModule,
    GameModule,
    FileModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
