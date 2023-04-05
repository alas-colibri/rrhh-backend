import { Injectable } from '@nestjs/common';
import { CatalogueTypesService } from '@core/services';
import { CreateCatalogueTypeDto } from '@core/dto';

@Injectable()
export class CatalogueTypesSeeder {
  constructor(private catalogueTypesService: CatalogueTypesService) {}

  async run() {
    await this.createCatalogueTypes();
  }

  async createCatalogueTypes() {
    const catalogueTypes: CreateCatalogueTypeDto[] = [];
    catalogueTypes.push(
      {
        name: 'MASCULINO',
        type: 'GENERO',
      },
      {
        name: 'FEMENINO',
        type: 'GENERO',
      },
      {
        name: 'OTRO',
        type: 'GENERO',
      },
      {
        name: 'CASADO',
        type: 'ESTADO',
      },
      {
        name: 'SOLTERO',
        type: 'ESTADO',
      },
      {
        name: 'DIVORCIADO',
        type: 'ESTADO',
      },
      {
        name: 'UNIÓN LIBRE',
        type: 'ESTADO',
      },
      {
        name: 'Por contrato',
        type: 'VACACIONES',
      },
      {
        name: 'Por dependencia',
        type: 'VACACIONES',
      },
      {
        name: 'Por consultoria',
        type: 'VACACIONES',
      },
      {
        name: 'Ibarra',
        type: 'CIUDADES',
      },
      {
        name: 'Quito',
        type: 'CIUDADES',
      },
      {
        name: 'Temporada',
        type: 'TIPOCONTRATO',
      },
      {
        name: 'Indefinido',
        type: 'TIPOCONTRATO',
      },
    );

    for (const catalogueType of catalogueTypes) {
      await this.catalogueTypesService.create(catalogueType);
    }
  }
}
