import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateDogFavoriteDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  dogId: number;
}
