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

export class BaseHolidayDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;
}
