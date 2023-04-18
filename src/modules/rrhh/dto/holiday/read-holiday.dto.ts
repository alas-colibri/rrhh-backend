import { Exclude, Expose } from 'class-transformer';
import { BaseHolidayDto } from './base-holiday.dto';

@Exclude()
export class ReadHolidayDto extends BaseHolidayDto {
  @Expose()
  readonly id;

  @Expose()
  readonly person;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly typeHoliday;

  @Expose()
  readonly observation;
}
