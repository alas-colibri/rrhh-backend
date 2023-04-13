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
import { CreateProjectAssignmentDto } from '../dto/projectAssignment/create-projectAssignment.dto';
import { FilterProjectAssignmentDto } from '../dto/projectAssignment/filter-projectAssignment.dto';
import { UpdateProjectAssignmentDto } from '../dto/projectAssignment/update-projectAssignment.dto';
import { ProjectAssignmentEntity } from '../entities/projectAssignment.entity';
import { ProjectAssignmentService } from '../services/projectAssignment.service';

@ApiTags('ProjectAssignment')
@Controller('projectAssignment')
export class ProjectAssignmentController {
  constructor(private projectAssignmentService: ProjectAssignmentService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateProjectAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.create(payload);
    return {
      data: serviceResponse.data,
      message: 'Proyecto asignado correcto',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.catalogue();

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
    @Query() params: FilterProjectAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.findAll(params);

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
    const serviceResponse = await this.projectAssignmentService.findOne(id);

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
    @Body() payload: UpdateProjectAssignmentDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.update(
      id,
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Evento Agregado ${id}`,
      title: `Agregado`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Proyecto Cancelado ${id}`,
      title: `Cancelar`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: ProjectAssignmentEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.projectAssignmentService.removeAll(
      payload,
    );

    return {
      data: serviceResponse.data,
      message: `Proyectos cancelados`,
      title: `Cancelado`,
    };
  }
}
