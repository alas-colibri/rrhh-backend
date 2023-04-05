import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class FilterPersonDto extends PaginationDto {
  @IsOptional()
  readonly name?: string;
}
