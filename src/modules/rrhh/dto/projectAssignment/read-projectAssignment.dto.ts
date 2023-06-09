import { Exclude, Expose } from 'class-transformer';
import { BaseProjectAssignmentDto } from './base-projectAssignment.dto';

@Exclude()
export class ReadProjectAssignmentDto extends BaseProjectAssignmentDto {
  @Expose()
  readonly id;

  @Expose()
  readonly departureDateProject;

  @Expose()
  readonly dateEntryProject;

  @Expose()
  readonly dateEntryFoundation;

  @Expose()
  readonly projectCharge;

  @Expose()
  readonly availableProject;

  @Expose()
  readonly person;
}
