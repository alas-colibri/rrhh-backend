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
import { ProjectAssignmentEntity } from './projectAssignment.entity';
@Entity('documents', { schema: 'uic' })
export class DocumentosEntity {
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
  @ManyToOne(() => PersonEntity, (user) => user.user)
  @JoinColumn({ name: 'user_id' })
  user: PersonEntity;
  //Fields

  @Column('boolean', {
    name: 'note1',
    comment: 'Resultados de la evaluación',
  })
  note1: boolean;

  @Column('boolean', {
    name: 'note2',
    comment: 'Resultados de la evaluación',
  })
  note2: boolean;

  @Column('boolean', {
    name: 'note3',
    comment: 'Resultados de la evaluación',
  })
  note3: boolean;

  @Column('boolean', {
    name: 'note4',
    comment: 'Resultados de la evaluación',
  })
  note4: boolean;

  @Column('boolean', {
    name: 'note5',
    comment: 'Resultados de la evaluación',
  })
  note5: boolean;
}
