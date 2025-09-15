import { IsInt, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostFavoriteDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean = true;
}
