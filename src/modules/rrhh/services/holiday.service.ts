import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { HolidayEntity } from '../entities/holiday.entity';
import { CreateHolidayDto } from '../dto/holiday/create-holiday.dto';
import { FilterHolidayDto } from '../dto/holiday/filter-holiday.dto';
import { ReadHolidayDto } from '../dto/holiday/read-holiday.dto';
import { UpdateHolidayDto } from '../dto/holiday/update-holiday.dto';

@Injectable()
export class HolidayService {
  constructor(
    @Inject(RepositoryEnum.HOLIDAY_REPOSITORY)
    private repository: Repository<HolidayEntity>,
  ) {}

  //Metodo Create
  async create(payload: CreateHolidayDto): Promise<ServiceResponseHttpModel> {
    const newHoliday = this.repository.create(payload);
    const holidayCreated = await this.repository.save(newHoliday);

    return { data: plainToInstance(CreateHolidayDto, holidayCreated) };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: { person: true },
      take: 1000,
    });

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

  async findAll(params?: FilterHolidayDto): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: {
        person: true,
      },
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadHolidayDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findByPlanning(
  //   planningId: string,
  //   params?: FilterHolidayDto,
  // ): Promise<ServiceResponseHttpModel> {
  //   const response = await this.repository.findAndCount({
  //     //where:,
  //     relations: {},
  //     order: { updatedAt: 'DESC' },
  //   });

  //   return {
  //     data: plainToInstance(ReadHolidayDto, response[0]),
  //     pagination: { totalItems: response[1], limit: 10 },
  //   };
  // }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const holiday = await this.repository.findOne({
      where: { id },
      relations: {
        person: true,
      },
    });

    if (!holiday) {
      throw new NotFoundException('holiday not found');
    }

    return { data: plainToInstance(ReadHolidayDto, holiday) };
  }

  async update(
    id: string,
    payload: UpdateHolidayDto,
  ): Promise<ServiceResponseHttpModel> {
    const holiday = await this.repository.preload({ id, ...payload });

    if (!holiday) {
      throw new NotFoundException('Vacacion no Encontrada');
    }

    const holidayUpdated = await this.repository.save(holiday);

    return { data: plainToInstance(ReadHolidayDto, holidayUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const holiday = await this.repository.findOneBy({ id });

    if (!holiday) {
      throw new NotFoundException('No se pudo Eliminar');
    }

    const holidayDeleted = await this.repository.softRemove(holiday);

    return { data: plainToInstance(ReadHolidayDto, holidayDeleted) };
  }

  async removeAll(payload: HolidayEntity[]): Promise<ServiceResponseHttpModel> {
    const holidayDeleted = await this.repository.softRemove(payload);
    return { data: holidayDeleted };
  }

  private async paginateAndFilter(
    params: FilterHolidayDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<HolidayEntity>
      | FindOptionsWhere<HolidayEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ person: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: {
        person: true,
      },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadHolidayDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
