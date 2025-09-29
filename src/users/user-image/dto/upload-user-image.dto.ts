import { IsNotEmpty, IsString } from 'class-validator';

export class UploadUserImageDto {
  @IsNotEmpty()
  @IsString()
  imageData: string;

  @IsNotEmpty()
  @IsString()
  mimeType: string;
}
