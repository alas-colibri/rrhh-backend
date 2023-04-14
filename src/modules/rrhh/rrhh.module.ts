import { Global, Module } from '@nestjs/common';
import { DatabaseModule } from '@database';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { rrhhProviders } from './providers';
import {
  EvaluationController,
  EventsController,
  PersonController,
} from './controllers';
import { EventsService, PersonService } from './services';
import { ProyectController } from './controllers/proyect.controller';
import { ProyectService } from './services/proyect.service';
import { HolidayController } from './controllers/holiday.controller';
import { HolidayService } from './services/holiday.service';
import { ProjectAssignmentController } from './controllers/projectAssignment.controller';
import { ProjectAssignmentService } from './services/projectAssignment.service';
import { EvaluationService } from './services/evaluation.service';
import { DocumentosController } from './controllers/documentos.controller';
import { DocumentosService } from './services/documentos.service';

@Global()
@Module({
  imports: [
    DatabaseModule,
    NestjsFormDataModule.config({
      storage: MemoryStoredFile,
    }),
  ],

  controllers: [
    EvaluationController,
    EventsController,
    ProyectController,
    HolidayController,
    PersonController,
    ProjectAssignmentController,
    DocumentosController,
  ],
  providers: [
    ...rrhhProviders,
    EvaluationService,
    EventsService,
    ProyectService,
    HolidayService,
    PersonService,
    ProjectAssignmentService,
    DocumentosService,
  ],

  exports: [],
})
export class RrhhModule {}
