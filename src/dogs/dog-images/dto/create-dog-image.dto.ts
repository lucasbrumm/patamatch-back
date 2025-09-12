import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class CreateDogImageDto {
  @IsString()
  @IsNotEmpty()
  imageData: string; // Base64 encoded image

  @IsString()
  @IsNotEmpty()
  mimeType: string; // e.g., "image/jpeg", "image/png"

  @IsString()
  @IsOptional()
  filename?: string; // Original filename

  @IsInt()
  @IsOptional()
  @Min(0)
  size?: number; // File size in bytes

  @IsInt()
  @IsNotEmpty()
  dogId: number;
}
