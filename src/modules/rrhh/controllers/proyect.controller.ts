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
import { ProyectService } from '../services/proyect.service';
import { CreateProyectDto } from '../dto/proyect/create-proyect.dto';
import { FilterProyectDto } from '../dto/proyect/filter-proyect.dto';
import { UpdateProyectDto } from '../dto/proyect/update-event.dto';
import { ProyectEntity } from '../entities/proyect.entity';

@ApiTags('Proyect')
@Controller('proyect')
export class ProyectController {
  constructor(private proyectService: ProyectService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProyectDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.proyectService.create(payload);
    return {
      data: serviceResponse.data,
      message: 'Proyecto creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.proyectService.catalogue();

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
  async findAll(@Query() params: FilterProyectDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.proyectService.findAll(params);

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
    const serviceResponse = await this.proyectService.findOne(id);

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
    @Body() payload: UpdateProyectDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.proyectService.update(id, payload);

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
    const serviceResponse = await this.proyectService.remove(id);

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
    @Body() payload: ProyectEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.proyectService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Proyectos eliminados`,
      title: `Eliminado`,
    };
  }
}
