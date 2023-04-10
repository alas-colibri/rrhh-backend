import { PaginationDto } from '@core/dto';

export class FilterEvaluationDto extends PaginationDto {
  readonly results: string;
}
