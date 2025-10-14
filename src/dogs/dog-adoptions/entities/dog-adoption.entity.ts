import { DogAdoption } from '@prisma/client';

export class DogAdoptionEntity implements DogAdoption {
  id: number;
  status: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  dogId: number;
}

