import { PartialType } from '@nestjs/swagger';
import { CreateCatalogueTypeDto } from '@core/dto';

export class UpdateCatalogueTypeDto extends PartialType(
  CreateCatalogueTypeDto,
) {}
