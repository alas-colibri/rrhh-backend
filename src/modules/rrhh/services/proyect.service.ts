import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { EventEntity } from '../entities';
import { ProyectEntity } from '../entities/proyect.entity';
import { CreateProyectDto } from '../dto/proyect/create-proyect.dto';
import { FilterProyectDto } from '../dto/proyect/filter-proyect.dto';
import { ReadProyectDto } from '../dto/proyect/read-event.dto';
import { UpdateProyectDto } from '../dto/proyect/update-event.dto';

@Injectable()
export class ProyectService {
  constructor(
    @Inject(RepositoryEnum.PROYECT_REPOSITORY)
    private repository: Repository<ProyectEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateProyectDto): Promise<ServiceResponseHttpModel> {
    const newProyect = this.repository.create(payload);
    const proyectCreated = await this.repository.save(newProyect);

    return { data: plainToInstance(CreateProyectDto, proyectCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
  // //asignar fases
  //   async assignEvent(payload: CreateEventDto): Promise<ServiceResponseHttpModel> {
  //     const newPlanning = this.repository.create(payload);
  //     const EventCreated = await this.repository.save(newPlanning);

  //     return { data: plainToInstance(ReadEventDto, EventCreated) };
  //   }

  async findAll(params?: FilterProyectDto): Promise<ServiceResponseHttpModel> {
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
      data: plainToInstance(ReadProyectDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const proyect = await this.repository.findOne({
      where: { id },
      //relations: { catalogue: true, planning: true },
    });

    if (!proyect) {
      throw new NotFoundException('proyect not found');
    }

    return { data: plainToInstance(ReadProyectDto, proyect) };
  }

  async update(
    id: string,
    payload: UpdateProyectDto,
  ): Promise<ServiceResponseHttpModel> {
    const proyect = await this.repository.preload({ id, ...payload });

    if (!proyect) {
      throw new NotFoundException('Proyect not found');
    }

    const proyectUpdated = await this.repository.save(proyect);

    return { data: plainToInstance(ReadProyectDto, proyectUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const proyect = await this.repository.findOneBy({ id });

    if (!proyect) {
      throw new NotFoundException('Proyect not found');
    }

    const proyectDeleted = await this.repository.softRemove(proyect);

    return { data: plainToInstance(ReadProyectDto, proyectDeleted) };
  }

  async removeAll(payload: ProyectEntity[]): Promise<ServiceResponseHttpModel> {
    const proyectDeleted = await this.repository.softRemove(payload);
    return { data: proyectDeleted };
  }

  private async paginateAndFilter(
    params: FilterProyectDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ProyectEntity>
      | FindOptionsWhere<ProyectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ nameProyect: ILike(`%${search}%`) });
      where.push({ descripcionProyect: ILike(`%${search}%`) });
      //where.push({ isEnable: ILike(`%${search}%`) });
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
      data: plainToInstance(ReadProyectDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
