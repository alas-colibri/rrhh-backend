import { Exclude, Expose } from 'class-transformer';
import { BaseProyectDto } from './base-proyect.dto';

@Exclude()
export class ReadProyectDto extends BaseProyectDto {
  @Expose()
  readonly id;

  // @Expose()
  // readonly catalogue;

  // @Expose()
  // readonly planning;

  @Expose()
  readonly startDate;

  @Expose()
  readonly endDate;

  @Expose()
  readonly isEnable;

  @Expose()
  readonly nameProyect;

  @Expose()
  readonly descripcionProyect;

  @Expose()
  readonly tipodeProyect;
}
