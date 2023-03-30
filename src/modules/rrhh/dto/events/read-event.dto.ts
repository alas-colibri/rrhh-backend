import { Exclude, Expose } from 'class-transformer';
import { BaseEventDto } from './base-event.dto';

@Exclude()
export class ReadEventDto extends BaseEventDto {
  @Expose()
  readonly id;

  @Expose()
  readonly question;

  @Expose()
  readonly active;
}
