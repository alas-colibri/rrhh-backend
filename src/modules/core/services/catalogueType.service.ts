import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';
import {
  CreateCatalogueTypeDto,
  UpdateCatalogueTypeDto,
  FilterCatalogueTypeDto,
  PaginationDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';
import { CatalogueTypeEntity } from '../entities/catalogueType.entity';

@Injectable()
export class CatalogueTypesService {
  constructor(
    @Inject(RepositoryEnum.CATALOGUE_TYPE_REPOSITORY)
    private repository: Repository<CatalogueTypeEntity>,
  ) {}

  async create(
    payload: CreateCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    const newCatalogueType = this.repository.create(payload);

    // newCareer.institution = await this.institutionService.findOne(
    //   payload.institution.id,
    // );
    // newCareer.modality = await this.cataloguesService.findOne(
    //   payload.modality.id,
    // );
    // newCareer.state = await this.cataloguesService.findOne(payload.state.id);
    // newCareer.type = await this.cataloguesService.findOne(payload.type.id);
    const catalogueTypeCreated = await this.repository.save(newCatalogueType);
    return { data: catalogueTypeCreated };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({ take: 1000 });

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(
    params?: FilterCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.repository.findAndCount({
      relations: [],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<any> {
    const catalogueType = await this.repository.findOne({
      relations: [],
      where: {
        id,
      },
    });

    if (!catalogueType) {
      throw new NotFoundException(
        `La CatalogueType con id:  ${id} no se encontro`,
      );
    }
    return { data: catalogueType };
  }

  async update(
    id: string,
    payload: UpdateCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    const catalogueType = await this.repository.findOneBy({ id });
    if (!catalogueType) {
      throw new NotFoundException(
        `La CatalogueType con id:  ${id} no se encontro`,
      );
    }
    this.repository.merge(catalogueType, payload);
    const catalogueTypeUpdated = await this.repository.save(catalogueType);
    return { data: catalogueTypeUpdated };
  }

  async remove(id: string): Promise<ServiceResponseHttpModel> {
    const catalogueType = await this.repository.findOneBy({ id });

    if (!catalogueType) {
      throw new NotFoundException(
        `La CatalogueType con id:  ${id} no se encontro`,
      );
    }

    const catalogueTypeDeleted = await this.repository.softRemove(
      catalogueType,
    );

    return { data: catalogueTypeDeleted };
  }

  async removeAll(
    payload: CatalogueTypeEntity[],
  ): Promise<ServiceResponseHttpModel> {
    const catalogueTypesDeleted = await this.repository.softRemove(payload);
    return { data: catalogueTypesDeleted };
  }

  private async paginateAndFilter(
    params: FilterCatalogueTypeDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<CatalogueTypeEntity>
      | FindOptionsWhere<CatalogueTypeEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: [],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
