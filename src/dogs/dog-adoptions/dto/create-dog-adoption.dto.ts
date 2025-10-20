import { IsInt, IsOptional, IsString } from 'class-validator';

export enum AdoptionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class CreateDogAdoptionDto {
  @IsInt()
  userId: number;

  @IsInt()
  dogId: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
