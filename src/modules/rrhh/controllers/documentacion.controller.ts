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
import { DocumentacionService } from '../services/documentacion.service';
import { CreateDocumentacionDto } from '../dto/documentacion/create-documentacion.dto';
import { FilterDocumentacionDto } from '../dto/documentacion/filter-documentacion.dto';

@ApiTags('Documentacion')
@Controller('documentacion')
export class DocumentacionController {
  constructor(private documentacionService: DocumentacionService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateDocumentacionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.create(payload);
    return {
      data: serviceResponse.data,
      message: 'Documento creado correcto',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.catalogue();

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
    @Query() params: FilterDocumentacionDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.findAll(params);

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
    const serviceResponse = await this.documentacionService.findOne(id);

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
    @Body() payload: UpdateEvaluationDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Evento actualizado ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Proyecto eliminado ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: EvaluationEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.documentacionService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Proyectos eliminados`,
      title: `Eliminado`,
    };
  }
}