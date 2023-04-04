import { IsNotEmpty, IsDate, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BasePersonDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly names: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly lastNames: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly identificationCode: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly civilStatus: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly gender: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDate()
  readonly birthdate: Date;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly phone: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly city: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly profession: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly typeContract: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly projects: string;
}
