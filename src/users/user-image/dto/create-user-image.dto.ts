import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateUserImageDto {
  @IsNotEmpty()
  @IsString()
  imageData: string;

  @IsNotEmpty()
  @IsString()
  mimeType: string;

  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  size?: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
