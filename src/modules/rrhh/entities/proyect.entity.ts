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
@Entity('proyect', { schema: 'uic' })
export class ProyectEntity {
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
  //Fields
  @Column('timestamp', {
    name: 'end_date',
    comment: 'Fin del proyecto',
  })
  endDate: Date;

  @Column('boolean', {
    name: 'is_enable',
    comment: 'True= visible, False= no visible ',
  })
  isEnable: boolean;

  @Column('timestamp', {
    name: 'start_date',
    comment: 'Inicio del proyecto',
  })
  startDate: Date;

  @Column('number', {
    name: 'cedula',
    comment: 'Cedula del trabajador',
  })
  cedula: number;

  @Column('string', {
    name: 'nameTrabajador',
    comment: 'Nombre del trabajador',
  })
  nameTrabajador: string;

  @Column('string', {
    name: 'proyectAsignado',
    comment: 'Proyecto asignar',
  })
  proyectAsignado: string;
  


}
