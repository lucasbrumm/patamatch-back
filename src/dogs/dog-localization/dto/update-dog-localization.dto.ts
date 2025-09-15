import { PartialType } from '@nestjs/mapped-types';
import { CreateDogLocalizationDto } from './create-dog-localization.dto';

export class UpdateDogLocalizationDto extends PartialType(CreateDogLocalizationDto) {}
