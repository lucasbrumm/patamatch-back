import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostLocalizationDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
