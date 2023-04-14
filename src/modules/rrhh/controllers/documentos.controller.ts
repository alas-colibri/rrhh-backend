import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//import { Uic } from '@uic/decorators';
import { ResponseHttpModel } from '@shared/models';
import { Auth } from '@auth/decorators';
import { EvaluationService } from '../services/evaluation.service';
import { CreateEvaluationDto } from '../dto/evaluation/create-evaluation.dto';
import { FilterEvaluationDto } from '../dto/evaluation/filter-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/evaluation/update-evaluation.dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { CreateDocumentosDto } from '../dto/documentos/create-documentos.dto';
import { UpdateDocumentosDto } from '../dto/documentos/update-documentos.dto';
import { FilterDocumentosDto } from '../dto/documentos/filter-documentos.dto';
import { DocumentosEntity } from '../entities/documentos.entity';
import { DocumentosService } from '../services/documentos.service';

@ApiTags('Documentos')
@Controller('documentos')
export class DocumentosController {
  constructor(private documentosService: DocumentosService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateDocumentosDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.create(payload);
    return {
      data: serviceResponse.data,
      message: 'Documento creada',
      title: 'Documento',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `catalogue`,
      title: `Catalogue`,
    };
  }

  /*}@ApiOperation({ summary: 'Events for sidebar' })
        @Get('sidebar')
        @HttpCode(HttpStatus.OK)
        async getEventsForSidebar(): Promise<ResponseHttpModel> {
          const serviceResponse = await this.eventsService.getEventsForSidebar();
      
          return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `Catalogue for Sidebar`,
            title: `Catalogue for Sidebar`,
          };
        }*/

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterDocumentosDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `mirar ${id}`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateDocumentosDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Se actualizo el avance`,
      title: `Revisión`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Documenti eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: DocumentosEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentosService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Documentos eliminados`,
      title: `Eliminado`,
    };
  }
}
