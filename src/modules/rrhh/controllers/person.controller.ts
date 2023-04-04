import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreatePersonDto } from '../dto/person/create-person.dto';
import { PersonService } from '../services';

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
}
