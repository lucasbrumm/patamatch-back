import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsUrl,
  IsIn,
  IsInt,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsIn(['adoption', 'general', 'update'])
  @IsOptional()
  postType?: string;


  @IsInt()
  @IsOptional()
  authorId?: number;

  @IsInt()
  @IsOptional()
  dogId?: number;
}
