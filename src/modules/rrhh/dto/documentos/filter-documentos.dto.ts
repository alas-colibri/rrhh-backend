import { PaginationDto } from '@core/dto';

export class FilterDocumentosDto extends PaginationDto {
  readonly name?: string;

  readonly observation: string;

  readonly noteF: string;
}
