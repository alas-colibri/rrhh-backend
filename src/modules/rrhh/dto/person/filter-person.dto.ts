import { PaginationDto } from '@core/dto';
import { IsOptional } from 'class-validator';

export class FilterPersonDto extends PaginationDto {
  @IsOptional()
  readonly name?: string;
}
