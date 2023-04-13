import { PaginationDto } from '@core/dto';

export class FilterProjectAssignmentDto extends PaginationDto {
  readonly person?: string;
  //readonly dateEntryProject: Date;

  readonly availableProject: string;
}
