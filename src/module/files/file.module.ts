import { Module } from '@nestjs/common';
import { FileBusiness } from './business/file.business';
import { FileController } from './controller/file.controller';
import { FileService } from './service/file.service';
import { File } from './entity/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FileController],
  providers: [FileBusiness, FileService],
  exports: [FileBusiness],
})
export class FileModule {}
