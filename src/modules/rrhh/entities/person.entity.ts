import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { EvaluationEntity } from './evaluation.entity';
@Entity('person', { schema: 'uic' })
export class PersonEntity {
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

  // Relationships

  // @ManyToOne(() => CatalogueEntity, (catalogue) => catalogue.events)
  // @JoinColumn({ name: 'catalogue_id' })
  // catalogue: CatalogueEntity;

  // @ManyToOne(() => PlanningEntity, (planning) => planning.events)
  // @JoinColumn({ name: 'planning_id' })
  // planning: PlanningEntity;

  // @OneToMany(
  //   () => ResponsibleTutorEntity,
  //   (responsible) => responsible.dateEvent,
  // )
  // dateEvents: ResponsibleTutorEntity[];
  @OneToMany(() => EvaluationEntity, (person) => person.name)
  person: EvaluationEntity[];

  //Fields
  @Column('varchar', {
    name: 'names',
    comment: 'Nombres Completos',
  })
  names: string;

  @Column('varchar', {
    name: 'last_names',
    comment: 'Apellidos',
  })
  lastNames: string;

  @Column('varchar', {
    name: 'identification_code',
    comment: 'Cedula',
  })
  identificationCode: string;

  @Column('varchar', {
    name: 'civil_status',
    comment: 'Estado Civil',
  })
  civilStatus: string;

  @Column('varchar', {
    name: 'gender',
    comment: 'Genero',
  })
  gender: string;

  @Column('timestamp', {
    name: 'birth_date',
    comment: 'Fecha de Nacimiento',
  })
  birthdate: Date;

  @Column('varchar', {
    name: 'phone',
    comment: 'Telefono',
  })
  phone: string;

  @Column('varchar', {
    name: 'city',
    comment: 'Ciudad',
  })
  city: string;

  @Column('varchar', {
    name: 'profession',
    comment: 'Profesion',
  })
  profession: string;

  @Column('varchar', {
    name: 'type_contract',
    comment: 'Tipo de Contrato',
  })
  typeContract: string;
}
