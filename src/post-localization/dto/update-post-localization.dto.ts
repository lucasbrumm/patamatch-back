import { PartialType } from '@nestjs/mapped-types';
import { CreatePostLocalizationDto } from './create-post-localization.dto';

export class UpdatePostLocalizationDto extends PartialType(
  CreatePostLocalizationDto,
) {}
