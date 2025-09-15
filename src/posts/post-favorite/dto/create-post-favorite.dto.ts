import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePostFavoriteDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  postId: number;
}
