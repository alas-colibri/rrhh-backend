import { PaginationDto } from '@core/dto';

export class FilterDocumentosDto extends PaginationDto {
  readonly user?: string;
}
