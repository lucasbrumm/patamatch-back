import { PartialType } from '@nestjs/mapped-types';
import { CreateDogImageDto } from './create-dog-image.dto';

export class UpdateDogImageDto extends PartialType(CreateDogImageDto) {}
