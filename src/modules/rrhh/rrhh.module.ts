import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { Repository } from 'typeorm';
import { rrhhProviders } from './providers';
import { EventsController } from './controllers';
import { EventsService } from './services';
import { ProyectController } from './controllers/proyect.controller';
import { ProyectService } from './services/proyect.service';

@Global()
@Module({
  imports: [
    DatabaseModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
  ],
  controllers: [EventsController, ProyectController],
  providers: [...rrhhProviders, EventsService, ProyectService],
  exports: [],
})
export class RrhhModule {}
