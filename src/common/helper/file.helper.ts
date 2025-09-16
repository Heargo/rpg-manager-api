import { brotliCompress, brotliCompressSync, constants } from 'zlib';

export class FileHelper {
  public static readonly MAX_FILE_SIZE_IN_BYTES = 5 * 1024 * 1024; // 5MB

  public static compressImage(buffer: Buffer): Buffer {
    return brotliCompressSync(buffer, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 4,
      },
    });
  }

  public static isBufferSizeValid(buffer: Buffer): boolean {
    //compare size of buffer with max size
    return buffer?.length <= this.MAX_FILE_SIZE_IN_BYTES;
  }
}
