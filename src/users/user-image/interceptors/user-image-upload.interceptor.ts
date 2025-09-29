import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserImageUploadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Remove imageData from response to avoid sending large base64 strings
        if (data && typeof data === 'object') {
          const { imageData, ...responseData } = data;
          return responseData;
        }
        return data;
      }),
    );
  }
}
