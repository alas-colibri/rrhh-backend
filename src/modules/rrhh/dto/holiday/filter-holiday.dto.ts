import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterHolidayDto extends PaginationDto {
  @IsOptional()
  readonly name?: string;
}
