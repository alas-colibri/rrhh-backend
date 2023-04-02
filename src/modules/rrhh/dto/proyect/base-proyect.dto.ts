import {
  IsNotEmpty,
  IsDate,
  Allow,
  IsPositive,
  IsBoolean,
  IsNumber,
  IsString,
} from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseProyectDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly isEnable: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber()
  readonly cedula: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly nameTrabajador: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly proyectAsignado: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly tipodeProyect: string;
}
