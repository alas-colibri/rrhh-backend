import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreatePersonDto } from '../dto/person/create-person.dto';
import { ReadPersonDto } from '../dto/person/read-person.dto';
import { PersonEntity } from '../entities/person.entity';
import { FilterPersonDto } from '../dto/person/filter-person.dto';
import { PaginationDto } from '@core/dto';
import { UpdatePersonDto } from '../dto/person/update-person.dto';

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

  //metodo find all

  async findAll(params?: FilterPersonDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: {},
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadPersonDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  private async paginateAndFilter(
    params: FilterPersonDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<PersonEntity>
      | FindOptionsWhere<PersonEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ names: ILike(`%${search}%`) });
      where.push({ lastNames: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {},
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadPersonDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const person = await this.repository.findOne({
      where: { id },
      //relations: { catalogue: true, planning: true },
    });

    if (!person) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return { data: plainToInstance(ReadPersonDto, person) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException('No se pudo eliminar');
    }

    const eventDeleted = await this.repository.softRemove(event);

    return { data: plainToInstance(ReadPersonDto, eventDeleted) };
  }

  async removeAll(payload: PersonEntity[]): Promise<ServiceResponseHttpModel> {
    const eventsDeleted = await this.repository.softRemove(payload);
    return { data: eventsDeleted };
  }

  async update(
    id: string,
    payload: UpdatePersonDto,
  ): Promise<ServiceResponseHttpModel> {
    const person = await this.repository.preload({ id, ...payload });

    if (!person) {
      throw new NotFoundException('Error al actualizar');
    }

    const personUpdated = await this.repository.save(person);

    return { data: plainToInstance(ReadPersonDto, personUpdated) };
  }
}
