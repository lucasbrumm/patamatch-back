import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ImageUploadInterceptor implements NestInterceptor {
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const file: Express.Multer.File = request.file as Express.Multer.File;

    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    // Validar tipo de arquivo
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Only ${this.allowedMimeTypes.join(', ')} are allowed.`,
      );
    }

    // Validar tamanho do arquivo
    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File size too large. Maximum size is ${this.maxSize / (1024 * 1024)}MB.`,
      );
    }

    return next.handle();
  }
}
