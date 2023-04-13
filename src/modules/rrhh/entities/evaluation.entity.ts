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
@Entity('evaluations', { schema: 'uic' })
export class EvaluationEntity {
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
  @ManyToOne(() => PersonEntity, (name) => name.name)
  @JoinColumn({ name: 'name_id' })
  name: PersonEntity;
  //Fields
  @Column('varchar', {
    name: 'question1',
    comment: 'Resultados de la evaluación',
  })
  question1: string;

  @Column('varchar', {
    name: 'question2',
    comment: 'Resultados de la evaluación',
  })
  question2: string;

  @Column('varchar', {
    name: 'question3',
    comment: 'Resultados de la evaluación',
  })
  question3: string;

  @Column('varchar', {
    name: 'question4',
    comment: 'Resultados de la evaluación',
  })
  question4: string;

  @Column('varchar', {
    name: 'question5',
    comment: 'Resultados de la evaluación',
  })
  question5: string;

  @Column('varchar', {
    name: 'note1',
    comment: 'Resultados de la evaluación',
  })
  note1: string;

  @Column('varchar', {
    name: 'note2',
    comment: 'Resultados de la evaluación',
  })
  note2: string;

  @Column('varchar', {
    name: 'note3',
    comment: 'Resultados de la evaluación',
  })
  note3: string;

  @Column('varchar', {
    name: 'note4',
    comment: 'Resultados de la evaluación',
  })
  note4: string;

  @Column('varchar', {
    name: 'note5',
    comment: 'Resultados de la evaluación',
  })
  note5: string;

  @Column('varchar', {
    name: 'observation',
    comment: 'Resultados de la evaluación',
  })
  observation: string;

  @Column('varchar', {
    name: 'noteF',
    comment: 'Resultados de la evaluación',
  })
  noteF: string;
}
