import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { Repository } from 'typeorm';
import { rrhhProviders } from './providers';
import { EventsController, PersonController } from './controllers';
import { EventsService, PersonService } from './services';

@Global()
@Module({
  imports: [
    DatabaseModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
  ],
  controllers: [EventsController, PersonController],
  providers: [...rrhhProviders, EventsService, PersonService],
  exports: [],
})
export class RrhhModule {}
