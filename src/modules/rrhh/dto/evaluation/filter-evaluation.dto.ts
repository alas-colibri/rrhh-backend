import { PaginationDto } from '@core/dto';

export class FilterEvaluationDto extends PaginationDto {
  readonly name?: string;

  readonly observation: string;

  readonly noteF: string;
}
