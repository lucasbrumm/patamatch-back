import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class CreateDogFavoriteDto {
  @IsInt()
  userId: number;

  @IsInt()
  dogId: number;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}
