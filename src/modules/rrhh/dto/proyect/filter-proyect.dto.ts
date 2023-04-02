import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class FilterProyectDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly sort: number;
  readonly name?: string;
}
