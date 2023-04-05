import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, LessThan, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { ProjectAssignmentEntity } from '../entities/projectAssignment.entity';
import { CreateProjectAssignmentDto } from '../dto/projectAssignment/create-projectAssignment.dto';
import { FilterProjectAssignmentDto } from '../dto/projectAssignment/filter-projectAssignment.dto';
import { ReadProjectAssignmentDto } from '../dto/projectAssignment/read-event.dto';
import { UpdateProjectAssignmentDto } from '../dto/projectAssignment/update-event.dto';

@Injectable()
export class ProjectAssignmentService {
  constructor(
    @Inject(RepositoryEnum.PROJECTASSIGNMENT_REPOSITORY)
    private repository: Repository<ProjectAssignmentEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateProjectAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    const newProjectAssignment = this.repository.create(payload);
    const projectAssignmentCreated = await this.repository.save(
      newProjectAssignment,
    );

    return {
      data: plainToInstance(
        CreateProjectAssignmentDto,
        projectAssignmentCreated,
      ),
    };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: [],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 10,
      },
      data: response[0],
    };
  }
  // //asignar fases
  //   async assignEvent(payload: CreateEventDto): Promise<ServiceResponseHttpModel> {
  //     const newPlanning = this.repository.create(payload);
  //     const EventCreated = await this.repository.save(newPlanning);

  //     return { data: plainToInstance(ReadEventDto, EventCreated) };
  //   }

  async findAll(
    params?: FilterProjectAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
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
      data: plainToInstance(ReadProjectAssignmentDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  // async findByPlanning(
  //   planningId: string,
  //   params?: FilterProyectDto,
  // ): Promise<ServiceResponseHttpModel> {
  //   const response = await this.repository.findAndCount({
  //     //where:,
  //     relations: {},
  //     order: { updatedAt: 'DESC' },
  //   });

  //   return {
  //     data: plainToInstance(ReadProyectDto, response[0]),
  //     pagination: { totalItems: response[1], limit: 10 },
  //   };
  // }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const projectAssignment = await this.repository.findOne({
      where: { id },
      //relations: { catalogue: true, planning: true },
    });

    if (!projectAssignment) {
      throw new NotFoundException('projectAssignment not found');
    }

    return {
      data: plainToInstance(ReadProjectAssignmentDto, projectAssignment),
    };
  }

  async update(
    id: string,
    payload: UpdateProjectAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    const projectAssignment = await this.repository.preload({ id, ...payload });

    if (!projectAssignment) {
      throw new NotFoundException('ProjectAssignment not found');
    }

    const projectAssignmentUpdated = await this.repository.save(
      projectAssignment,
    );

    return {
      data: plainToInstance(ReadProjectAssignmentDto, projectAssignmentUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const projectAssignment = await this.repository.findOneBy({ id });

    if (!projectAssignment) {
      throw new NotFoundException('ProjectAssignmentnot found');
    }

    const ProjectAssignmentDeleted = await this.repository.softRemove(
      projectAssignment,
    );

    return {
      data: plainToInstance(ReadProjectAssignmentDto, ProjectAssignmentDeleted),
    };
  }

  async removeAll(
    payload: ProjectAssignmentEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const projectAssignmentDeleted = await this.repository.softRemove(payload);
    return { data: projectAssignmentDeleted };
  }

  private async paginateAndFilter(
    params: FilterProjectAssignmentDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<ProjectAssignmentEntity>
      | FindOptionsWhere<ProjectAssignmentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //where.push({ catalogue: ILike(`%${search}%`) });
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
      data: plainToInstance(ReadProjectAssignmentDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
