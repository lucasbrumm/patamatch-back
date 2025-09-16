import { DogFavorite } from '@prisma/client';

export class DogFavoriteEntity implements DogFavorite {
  id: number;
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  dogId: number;
}
