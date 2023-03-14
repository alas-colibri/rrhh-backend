import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { Repository } from 'typeorm';
import { rrhhProviders } from './providers';
import { EventsController } from './controllers';
import { EventsService } from './services';

@Global()
@Module({
  imports: [
    DatabaseModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
  ],
  controllers: [
    EventsController,
  ],
  providers: [
    ...rrhhProviders,
    EventsService,
  ],
  exports: [],
})
export class RrhhModule {}
