import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { ProjectAssignmentEntity } from '../../entities/projectAssignment.entity';
import { PersonEntity } from '../../entities/person.entity';

export class BaseDocumentosDto {
  @Allow()
  readonly name: PersonEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly note1: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly note2: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly note3: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly note4: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly note5: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly question1: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly question2: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly question3: string;

  @IsString()
  readonly question4: string;

  @IsString()
  readonly question5: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly observation: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly noteF: string;
}
