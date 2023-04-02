import { Exclude, Expose } from 'class-transformer';
import { BaseProyectDto } from './base-proyect.dto';

@Exclude()
export class ReadEventDto extends BaseProyectDto {
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
  readonly cedula;

  @Expose()
  readonly nameTrabajador;

  @Expose()
  readonly proyectAsignado;

  @Expose()
  readonly tipodeProyect;
}
