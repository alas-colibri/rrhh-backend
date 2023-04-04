import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  CreateCatalogueTypeDto,
  UpdateCatalogueTypeDto,
  FilterCatalogueTypeDto,
} from '@core/dto';
import { CatalogueTypesService } from '@core/services';
import { ResponseHttpModel } from '@shared/models';
import { CatalogueTypeEntity } from '../entities/catalogueType.entity';

@ApiTags('CatalogueTypes')
@Controller('catalogueTypes')
export class CatalogueTypesController {
  constructor(private catalogueTypesService: CatalogueTypesService) {}

  @ApiOperation({ summary: 'Catalogue CatalogueTypes' })
  @Get('catalogue')
  @HttpCode(HttpStatus.OK)
  async catalogue(): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.catalogue();

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Catalogue CatalogueTypes`,
      title: `Catalogue`,
    };
  }

  @ApiOperation({ summary: 'Create CatalogueType' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'CatalogueType was created',
      title: 'CatalogueType Created',
    };
  }

  @ApiOperation({ summary: 'Find All CatalogueTypes' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() params: FilterCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: 'Find all CatalogueTypes',
      title: 'Success',
    };
  }

  @ApiOperation({ summary: 'Find CatalogueType' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Find CatalogueType`,
      title: `Success`,
    };
  }

  @ApiOperation({ summary: 'Update CatalogueType' })
  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateCatalogueTypeDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.update(
      id,
      payload,
    );
    return {
      data: serviceResponse.data,
      message: `CatalogueType was updated`,
      title: `CatalogueType Updated`,
    };
  }

  @ApiOperation({ summary: 'Delete CatalogueType' })
  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.remove(id);
    return {
      data: serviceResponse.data,
      message: `CatalogueType was deleted`,
      title: `CatalogueType Deleted`,
    };
  }

  @ApiOperation({ summary: 'Delete All CatalogueTypes' })
  @Patch('remove-all')
  @HttpCode(HttpStatus.CREATED)
  async removeAll(
    @Body() payload: CatalogueTypeEntity[],
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.catalogueTypesService.removeAll(payload);

    return {
      data: serviceResponse.data,
      message: `CatalogueType was deleted`,
      title: `CatalogueType Deleted`,
    };
  }
}
