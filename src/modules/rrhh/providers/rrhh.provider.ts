import { DataSource } from 'typeorm';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { EventEntity } from '../entities';

export const rrhhProviders = [
  {
    provide: RepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
