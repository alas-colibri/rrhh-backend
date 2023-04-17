import { Allow, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import {
  isBooleanValidationOptions,
  isNotEmptyValidationOptions,
} from '@shared/validation';
import { ProjectAssignmentEntity } from '../../entities/projectAssignment.entity';
import { PersonEntity } from '../../entities/person.entity';

export class BaseDocumentosDto {
  @Allow()
  readonly user: PersonEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly note1: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly note2: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly note3: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly note4: boolean;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean(isBooleanValidationOptions())
  readonly note5: boolean;
}
