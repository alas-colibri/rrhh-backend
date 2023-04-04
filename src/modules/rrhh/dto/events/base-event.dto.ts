import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseEventDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly question: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsBoolean()
  readonly active: boolean;
}
