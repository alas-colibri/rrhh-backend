import {
  IsNotEmpty,
  IsDate,
  Allow,
  IsBoolean,
  IsString,
} from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseProjectAssignmentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly dateEntryFoundation: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly dateEntryProject: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly departureDateProject: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly isEnable: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly availableProjects: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly projectCharge: string;
}
