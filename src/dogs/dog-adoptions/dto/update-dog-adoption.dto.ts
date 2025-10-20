import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import {
  CreateDogAdoptionDto,
  AdoptionStatus,
} from './create-dog-adoption.dto';

export class UpdateDogAdoptionDto extends PartialType(CreateDogAdoptionDto) {
  @IsOptional()
  @IsEnum(AdoptionStatus)
  status?: AdoptionStatus;
}
