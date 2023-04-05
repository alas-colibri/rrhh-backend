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
import { ResponseHttpModel } from '@shared/models';
import { CreatePersonDto } from '../dto/person/create-person.dto';
import { PersonService } from '../services';
import { FilterPersonDto } from '../dto/person/filter-person.dto';
import { Auth } from '@auth/decorators';
import { PersonEntity } from '../entities/person.entity';
import { UpdatePersonDto } from '../dto/person/update-person.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @ApiOperation({ summary: 'Create One Person' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreatePersonDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Persona creada',
      title: 'Creada',
    };
  }

  @ApiOperation({ summary: 'Find All' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: FilterPersonDto): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `index`,
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Update One' })
  @Auth()
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePersonDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Persona Actualizada ${id}`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Find One' })
  @Auth()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `mirar ${id}`,
      title: `Exito`,
    };
  }

  @ApiOperation({ summary: 'Remove One' })
  @Auth()
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.remove(id);

    return {
      data: serviceResponse.data,
      message: `Persona Eliminada ${id}`,
      title: `Eliminado`,
    };
  }

  @ApiOperation({ summary: 'Remove All' })
  @Auth()
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(@Body() payload: PersonEntity[]): Promise<ResponseHttpModel> {
    const serviceResponse = await this.personService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `Personas Eliminada`,
      title: `Eliminado`,
    };
  }
}
