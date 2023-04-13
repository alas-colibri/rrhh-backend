import { IsNotEmpty, IsDate, Allow, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';
import { PersonEntity } from '../../entities/person.entity';
import { ProyectEntity } from '../../entities/proyect.entity';

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

  //@IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly projectCharge: string;

  @Allow()
  readonly person: PersonEntity;

  @Allow()
  readonly availableProject: ProyectEntity;
}
