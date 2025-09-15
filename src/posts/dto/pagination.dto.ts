import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return 1;
    const parsed = parseInt(value as string, 10);
    return isNaN(parsed) ? 1 : parsed;
  })
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === undefined || value === null) return 4;
    const parsed = parseInt(value as string, 10);
    return isNaN(parsed) ? 4 : parsed;
  })
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 4;
}
