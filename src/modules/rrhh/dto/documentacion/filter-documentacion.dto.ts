import { PaginationDto } from '@core/dto';

export class FilterDocumentacionDto extends PaginationDto {
  readonly results: string;
}
