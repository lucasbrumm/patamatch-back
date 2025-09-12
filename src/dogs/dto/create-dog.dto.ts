import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  Max,
  IsIn,
} from 'class-validator';

export class CreateDogDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsString()
  @IsIn(['small', 'medium', 'large'])
  size: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isAdopted?: boolean;

  @IsInt()
  @IsOptional()
  ownerId?: number;
}
