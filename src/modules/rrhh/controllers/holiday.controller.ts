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
import { HolidayService } from '../services/holiday.service';
import { CreateHolidayDto } from '../dto/holiday/create-holiday.dto';
import { FilterHolidayDto } from '../dto/holiday/filter-holiday.dto';
import { UpdateHolidayDto } from '../dto/holiday/update-holiday.dto';
import { HolidayEntity } from '../entities/holiday.entity';

@ApiTags('holiday')
@Controller('holiday')
export class HolidayController {
  constructor(private holidayService: HolidayService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateHolidayDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.holidayService.create(payload);
    return {
      data: serviceResponse.data,
      message: 'Vacacion Asignada creada con exito',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Catalogue' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.holidayService.catalogue();

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
  async findAll(@Query() params: FilterHolidayDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.holidayService.findAll(params);

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
    const serviceResponse = await this.holidayService.findOne(id);

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
    @Body() payload: UpdateHolidayDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.holidayService.update(id, payload);

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
    const serviceResponse = await this.holidayService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Vacacion eliminada ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: HolidayEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.holidayService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Vacacion eliminada`,
      title: `Eliminado`,
    };
  }
}
