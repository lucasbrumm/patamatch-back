import { IsInt, IsNotEmpty } from 'class-validator';

export class UploadDogImageDto {
  @IsInt()
  @IsNotEmpty()
  dogId: number;
}
