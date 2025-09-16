import * as sharp from 'sharp';

export class FileHelper {
  public static readonly MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5MB

  public static async compressImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .jpeg({ quality: 60 }) // Adjust quality as needed
      .toBuffer();
  }

  public static isBufferSizeValid(buffer: Buffer): boolean {
    //compare size of buffer with max size
    return buffer?.length <= this.MAX_FILE_SIZE_IN_BYTES;
  }

  public static convertToBuffer(file: Express.Multer.File): Buffer {
    return Buffer.from(file.buffer);
  }
}
