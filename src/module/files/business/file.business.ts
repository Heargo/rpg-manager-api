import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from '../service/file.service';
import { File } from '../entity/file.entity';

@Injectable()
export class FileBusiness {
  // Business logic methods would go here
  constructor(@Inject(FileService) private fileService: FileService) {}

  public async getById(id: string): Promise<File> {
    const fileData = await this.fileService.getFileById(id);
    if (!fileData) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    return fileData;
  }

  public async deleteById(id: string): Promise<void> {
    const fileData = await this.fileService.getFileById(id);
    if (!fileData) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
    await this.fileService.deleteFileById(id);
  }
}
