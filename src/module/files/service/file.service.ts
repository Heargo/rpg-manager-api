import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { File } from '../entity/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async getFileById(id: string): Promise<File> {
    return this.fileRepository.findOne({ where: { id } });
  }

  async deleteFileById(id: string): Promise<DeleteResult> {
    return this.fileRepository.delete(id);
  }
}
