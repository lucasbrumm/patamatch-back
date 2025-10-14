import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

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

  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

