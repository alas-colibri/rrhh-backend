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

  @Column('string', {
    name: 'nameProyect',
    comment: 'Nombre del proyecto',
  })
  nameProyect: string;

  @Column('string', {
    name: 'descripcionProyect',
    comment: 'Descripcion del proyecto',
  })
  proyectAsignado: string;

  @Column('string', {
    name: 'tipodeProyect',
    comment: 'Tipo de proyecto',
  })
  tipodeProyect: string;
}
