import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Start kit API')
    .setDescription('This is the nestjs start kit API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const logger = new Logger('MAIN');
  logger.log(`Server running on port ${configService.getPort()}`);
  await app.listen(configService.getPort());

  function handle(signal) {
    logger.log(`Received event: ${signal}`);
    logger.log('exit process');
    process.exit(0);
  }

  process.on('SIGINT', handle);
  process.on('SIGTERM', handle);
}
bootstrap();
