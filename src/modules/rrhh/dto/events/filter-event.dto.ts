import { PaginationDto } from '@core/dto';

export class FilterEventDto extends PaginationDto {
  readonly question: string;
  readonly active: boolean;
}
