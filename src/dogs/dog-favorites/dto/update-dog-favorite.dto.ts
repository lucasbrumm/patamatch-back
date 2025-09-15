import { PartialType } from '@nestjs/mapped-types';
import { CreateDogFavoriteDto } from './create-dog-favorite.dto';

export class UpdateDogFavoriteDto extends PartialType(CreateDogFavoriteDto) {}
