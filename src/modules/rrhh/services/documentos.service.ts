import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { PaginationDto } from '@core/dto';
import { EvaluationEntity } from '../entities/evaluation.entity';
import { CreateEvaluationDto } from '../dto/evaluation/create-evaluation.dto';
import { FilterEvaluationDto } from '../dto/evaluation/filter-evaluation.dto';
import { ReadEvaluationDto } from '../dto/evaluation/read-evaluation.dto';
import { UpdateEvaluationDto } from '../dto/evaluation/update-evaluation.dto';
import { DocumentosEntity } from '../entities/documentos.entity';
import { CreateDocumentosDto } from '../dto/documentos/create-documentos.dto';
import { FilterDocumentosDto } from '../dto/documentos/filter-documentos.dto';
import { ReadDocumentosDto } from '../dto/documentos/read-documentos.dto';
import { UpdateDocumentosDto } from '../dto/documentos/update-documentos.dto';

@Injectable()
export class DocumentosService {
  constructor(
    @Inject(RepositoryEnum.DOCUMENTOS_REPOSITORY)
    private repository: Repository<DocumentosEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateDocumentosDto,
  ): Promise<ServiceResponseHttpModel> {
    const newDocumentos = this.repository.create(payload);
    const documentosCreated = await this.repository.save(newDocumentos);

    return { data: plainToInstance(CreateDocumentosDto, documentosCreated) };
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
    params?: FilterDocumentosDto,
  ): Promise<ServiceResponseHttpModel> {
    // Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //All
    const response = await this.repository.findAndCount({
      relations: ['name'],
      order: { updatedAt: 'DESC' },
    });

    return {
      data: plainToInstance(ReadDocumentosDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const documentos = await this.repository.findOne({
      where: { id },
      relations: { name: true },
    });

    if (!documentos) {
      throw new NotFoundException('Evaluation not found');
    }

    return { data: plainToInstance(ReadDocumentosDto, documentos) };
  }

  async update(
    id: string,
    payload: UpdateDocumentosDto,
  ): Promise<ServiceResponseHttpModel> {
    const documentos = await this.repository.preload({ id, ...payload });

    if (!documentos) {
      throw new NotFoundException('Evaluation not found');
    }

    const documentosUpdated = await this.repository.save(documentos);

    return { data: plainToInstance(ReadDocumentosDto, documentosUpdated) };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const documentos = await this.repository.findOneBy({ id });

    if (!documentos) {
      throw new NotFoundException('Evaluation not found');
    }

    const documentosDeleted = await this.repository.softRemove(documentos);

    return { data: plainToInstance(ReadDocumentosDto, documentosDeleted) };
  }

  async removeAll(
    payload: DocumentosEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const documentosDeleted = await this.repository.softRemove(payload);
    return { data: documentosDeleted };
  }

  private async paginateAndFilter(
    params: FilterDocumentosDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DocumentosEntity>
      | FindOptionsWhere<DocumentosEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
      where.push({ observation: ILike(`%${search}%`) });
      where.push({ noteF: ILike(`%${search}%`) });
    }
    const response = await this.repository.findAndCount({
      where,
      relations: { name: true },
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
      order: {
        updatedAt: 'DESC',
      },
    });

    return {
      data: plainToInstance(ReadDocumentosDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
