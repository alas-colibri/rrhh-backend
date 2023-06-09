import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProjectAssignmentEntity } from './projectAssignment.entity';
import { PersonEntity } from './person.entity';
@Entity('holidays', { schema: 'uic' })
export class HolidayEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  deletedAt: Date;
  //forkey
  @ManyToOne(() => PersonEntity, (person) => person.person)
  @JoinColumn({ name: 'person_id' })
  person: ProjectAssignmentEntity;
  name: HolidayEntity;
  //Fields
  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fin del proyecto',
  })
  endDate: Date;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Inicio del proyecto',
  })
  startDate: Date;

  @Column('varchar', {
    name: 'type_holiday',
    comment: 'Tipo de Vacacion',
  })
  typeHoliday: string;

  @Column('varchar', {
    name: 'observation_holiday',
    comment: 'observacion',
  })
  observation: string;
}
