import { PartialType } from '@nestjs/mapped-types';
import { CreateDogAdoptionDto } from './create-dog-adoption.dto';

export class UpdateDogAdoptionDto extends PartialType(CreateDogAdoptionDto) {}

