import { Exclude, Expose } from 'class-transformer';
import { BasePersonDto } from './base-person.dto';

@Exclude()
export class ReadPersonDto extends BasePersonDto {
  @Expose()
  readonly id;

  // @Expose()
  // readonly catalogue;

  // @Expose()
  // readonly planning;

  @Expose()
  readonly names;

  @Expose()
  readonly lastNames;

  @Expose()
  readonly identificationCode;

  @Expose()
  readonly civilStatus;

  @Expose()
  readonly gender;

  @Expose()
  readonly birthdate;

  @Expose()
  readonly phone;

  @Expose()
  readonly city;

  @Expose()
  readonly profession;

  @Expose()
  readonly typeContract;
}
