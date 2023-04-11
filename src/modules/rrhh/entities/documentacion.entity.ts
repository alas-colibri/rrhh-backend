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
import { PersonEntity } from './person.entity';
@Entity('documentacion', { schema: 'uic' })
export class DocumentacionEntity {
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
  ///Fk
  @ManyToOne(() => PersonEntity, (name) => name.person)
  @JoinColumn({ name: 'name_id' })
  name: DocumentacionEntity;
  //Fields
  @Column('varchar', {
    name: 'results',
    comment: 'Resultados de la evaluación',
  })
  results: string;
}
