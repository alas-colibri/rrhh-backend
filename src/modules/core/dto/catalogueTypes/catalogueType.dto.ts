import { IsString } from 'class-validator';
import { isStringValidationOptions } from '@shared/validation';

export class CatalogueTypeDto {
  @IsString(isStringValidationOptions())
  readonly type: string;

  @IsString(isStringValidationOptions())
  readonly name: string;
}
