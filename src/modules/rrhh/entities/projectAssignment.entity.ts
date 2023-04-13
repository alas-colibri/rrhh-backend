import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EvaluationEntity } from './evaluation.entity';
import { HolidayEntity } from './holiday.entity';
import { PersonEntity } from './person.entity';
import { ProyectEntity } from './proyect.entity';

@Entity('projectAssignment', { schema: 'uic' })
export class ProjectAssignmentEntity {
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
  //FK
  @OneToMany(() => HolidayEntity, (holiday) => holiday.name)
  holiday: HolidayEntity[];

  @OneToMany(() => EvaluationEntity, (holiday) => holiday.name)
  evaluation: EvaluationEntity[];

  @ManyToOne(() => PersonEntity, (person) => person.person)
  @JoinColumn({ name: 'person_id' })
  person: ProjectAssignmentEntity;

  @ManyToOne(
    () => ProyectEntity,
    (availableProject) => availableProject.availableProject,
  )
  @JoinColumn({ name: 'availableProject_id' })
  availableProject: ProjectAssignmentEntity;

  //Fields
  @Column('timestamp', {
    name: 'dateEntryFoundation',
    comment: 'Fecha de ingreso a la fundacion',
  })
  dateEntryFoundation: Date;

  @Column('timestamp', {
    name: 'dateEntryProject',
    comment: 'Fecha de ingreso al proyecto',
  })
  dateEntryProject: Date;

  @Column('timestamp', {
    name: 'departureDateProject',
    comment: 'Fecha de salida al proyecto',
  })
  departureDateProject: Date;

  @Column('varchar', {
    name: 'projectCharge',
    comment: 'Cargo del Proyecto',
  })
  projectCharge: string;
}
