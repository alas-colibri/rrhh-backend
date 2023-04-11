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
import { ProjectAssignmentEntity } from '../../entities/projectAssignment.entity';

export class BaseHolidayDto {
  @Allow()
  readonly name: ProjectAssignmentEntity;
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly endDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly startDate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly typeHoliday: string;
}
