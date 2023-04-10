import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { CreateEvaluationDto } from '../dto/evaluation/create-evaluation.dto';
import { FilterEvaluationDto } from '../dto/evaluation/filter-evaluation.dto';
import { ReadEvaluationDto } from '../dto/evaluation/read-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/evaluation/update-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @Inject(RepositoryEnum.EVALUATION_REPOSITORY)
    private repository: Repository<EvaluationEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    const newEvaluation = this.repository.create(payload);
    const evaluationCreated = await this.repository.save(newEvaluation);

    return { data: plainToInstance(CreateEvaluationDto, evaluationCreated) };
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

  async findAll(
    params?: FilterEvaluationDto,
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
      data: plainToInstance(ReadEvaluationDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOne({
      where: { id },
      //relations: { catalogue: true, planning: true },
    });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    return { data: plainToInstance(ReadEvaluationDto, evaluation) };
  }

  async update(
    id: string,
    payload: UpdateEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.preload({ id, ...payload });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const evaluationUpdated = await this.repository.save(evaluation);

    return { data: plainToInstance(ReadEvaluationDto, evaluationUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const evaluation = await this.repository.findOneBy({ id });

    if (!evaluation) {
      throw new NotFoundException('Evaluation not found');
    }

    const evaluationDeleted = await this.repository.softRemove(evaluation);

    return { data: plainToInstance(ReadEvaluationDto, evaluationDeleted) };
  }

  async removeAll(
    payload: EvaluationEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const evaluationDeleted = await this.repository.softRemove(payload);
    return { data: evaluationDeleted };
  }

  private async paginateAndFilter(
    params: FilterEvaluationDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<EvaluationEntity>
      | FindOptionsWhere<EvaluationEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //   where.push({ nameProyect: ILike(`%${search}%`) });
      //   where.push({ descripcionProyect: ILike(`%${search}%`) });
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
      data: plainToInstance(ReadEvaluationDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
