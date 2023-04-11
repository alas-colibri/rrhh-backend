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
import { DocumentacionEntity } from '../entities/documentacion.entity';
import { CreateDocumentacionDto } from '../dto/documentacion/create-documentacion.dto';
import { FilterDocumentacionDto } from '../dto/documentacion/filter-documentacion.dto';
import { ReadDocumentacionDto } from '../dto/documentacion/read-documentacion.dto';
import { UpdateDocumentacionDto } from '../dto/documentacion/update-documentacion.dto';

@Injectable()
export class DocumentacionService {
  constructor(
    @Inject(RepositoryEnum.DOCUMENTACION_REPOSITORY)
    private repository: Repository<DocumentacionEntity>,
  ) {}

  //Metodo Create
  async create(
    payload: CreateDocumentacionDto,
  ): Promise<ServiceResponseHttpModel> {
    const newDocumentacion = this.repository.create(payload);
    const documentacionCreated = await this.repository.save(newDocumentacion);

    return {
      data: plainToInstance(CreateDocumentacionDto, documentacionCreated),
    };
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
    params?: FilterDocumentacionDto,
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
      data: plainToInstance(ReadDocumentacionDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const documentacion = await this.repository.findOne({
      where: { id },
      //relations: { catalogue: true, planning: true },
    });

    if (!documentacion) {
      throw new NotFoundException('Document not found');
    }

    return { data: plainToInstance(ReadDocumentacionDto, documentacion) };
  }

  async update(
    id: string,
    payload: UpdateDocumentacionDto,
  ): Promise<ServiceResponseHttpModel> {
    const documentacion = await this.repository.preload({ id, ...payload });

    if (!documentacion) {
      throw new NotFoundException('Document not found');
    }

    const documentacionUpdated = await this.repository.save(documentacion);

    return {
      data: plainToInstance(ReadDocumentacionDto, documentacionUpdated),
    };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const documentacion = await this.repository.findOneBy({ id });

    if (!documentacion) {
      throw new NotFoundException('Evaluation not found');
    }

    const documentacionDeleted = await this.repository.softRemove(
      documentacion,
    );

    return {
      data: plainToInstance(ReadDocumentacionDto, documentacionDeleted),
    };
  }

  async removeAll(
    payload: DocumentacionEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const documentacionDeleted = await this.repository.softRemove(payload);
    return { data: documentacionDeleted };
  }

  private async paginateAndFilter(
    params: FilterDocumentacionDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<DocumentacionEntity>
      | FindOptionsWhere<DocumentacionEntity>[];
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
      data: plainToInstance(ReadDocumentacionDto, response[0]),
      pagination: { limit, totalItems: response[1] },
    };
  }
}
