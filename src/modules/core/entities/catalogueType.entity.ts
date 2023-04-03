import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('catalogueTypes', { schema: 'core' })
export class CatalogueTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion de la carrera',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la carrera',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion de la carrera',
  })
  deletedAt: Date;

  //Fields

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del campo del catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'type',
    comment: 'Tipo del catalogo',
  })
  type: string;
}
