import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

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

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(8)
  order?: number; // Order of image (1-8), defaults to 1
}
