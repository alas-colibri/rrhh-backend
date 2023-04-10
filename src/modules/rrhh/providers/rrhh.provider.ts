import { DataSource } from 'typeorm';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';

import {
  EventEntity,
  ProyectEntity,
  PersonEntity,
  EvaluationEntity,
} from '../entities';
import { HolidayEntity } from '../entities/holiday.entity';
import { ProjectAssignmentEntity } from '../entities/projectAssignment.entity';

export const rrhhProviders = [
  {
    provide: RepositoryEnum.EVALUATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EvaluationEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PERSON_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PersonEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.PROYECT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProyectEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
  {
    provide: RepositoryEnum.HOLIDAY_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(HolidayEntity),

    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },

  {
    provide: RepositoryEnum.PROJECTASSIGNMENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectAssignmentEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
