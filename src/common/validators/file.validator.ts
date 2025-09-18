import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export interface FileValidationOptions {
  required?: boolean;
  maxSize?: number;
  allowedTypes?: string[];
}

@Injectable()
export class FileValidator implements PipeTransform {
  constructor(private options: FileValidationOptions = {}) {}

  transform(file: Express.Multer.File | undefined, metadata: ArgumentMetadata) {
    const { required = false, maxSize, allowedTypes } = this.options;

    if (required && !file) {
      throw new BadRequestException('File is required');
    }
    if (!file) {
      return undefined;
    }
    if (maxSize && file.size > maxSize) {
      throw new BadRequestException(`File size exceeds ${maxSize} bytes`);
    }
    if (allowedTypes && allowedTypes.length > 0) {
      const isValidType = allowedTypes.some((type) =>
        file.mimetype.startsWith(type),
      );
      if (!isValidType) {
        throw new BadRequestException(
          `File type not allowed: ${file.mimetype}`,
        );
      }
    }
    return file;
  }
}
