import { Inject, Injectable } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { ReadEventDto } from '../dto/events/read-event.dto';
import { CreatePersonDto } from '../dto/person/create-person.dto';
import { ReadPersonDto } from '../dto/person/read-person.dto';
import { PersonEntity } from '../entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @Inject(RepositoryEnum.PERSON_REPOSITORY)
    private repository: Repository<PersonEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreatePersonDto): Promise<ServiceResponseHttpModel> {
    const newPerson = this.repository.create(payload);
    const personCreated = await this.repository.save(newPerson);

    return { data: plainToInstance(ReadPersonDto, personCreated) };
  }
}
