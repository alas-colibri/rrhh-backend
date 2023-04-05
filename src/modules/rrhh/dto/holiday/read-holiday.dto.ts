import { Exclude, Expose } from 'class-transformer';
import { BaseHolidayDto } from './base-holiday.dto';

@Exclude()
export class ReadHolidayDto extends BaseHolidayDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;
}
