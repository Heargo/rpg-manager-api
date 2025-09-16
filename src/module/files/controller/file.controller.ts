import {
  Controller,
  Get,
  Inject,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileBusiness } from '../business/file.business';

@Controller('file')
export class FileController {
  constructor(@Inject() private fileBusiness: FileBusiness) {}

  @Get(':id')
  async getFile(@Param('id') id: string): Promise<StreamableFile> {
    const fileData = await this.fileBusiness.getFileById(id);
    return new StreamableFile(fileData.file, {
      type: fileData.mimeType,
    });
  }
}
