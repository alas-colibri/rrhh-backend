import { PaginationDto } from '@core/dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class FilterProjectAssignmentDto extends PaginationDto {
  @IsOptional()
  readonly name?: string;
}
