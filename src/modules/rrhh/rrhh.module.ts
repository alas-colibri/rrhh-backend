import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { rrhhProviders } from './providers';
import { EventsController } from './controllers';
import { EventsService } from './services';
import { ProyectController } from './controllers/proyect.controller';
import { ProyectService } from './services/proyect.service';
import { HolidayController } from './controllers/holiday.controller';
import { HolidayService } from './services/holiday.service';

@Global()
@Module({
  imports: [
    DatabaseModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
  ],
  controllers: [EventsController, ProyectController, HolidayController],
  providers: [...rrhhProviders, EventsService, ProyectService, HolidayService],
  exports: [],
})
export class RrhhModule {}
