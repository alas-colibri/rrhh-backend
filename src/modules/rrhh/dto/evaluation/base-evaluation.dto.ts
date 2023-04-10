import { IsNotEmpty, IsString } from 'class-validator';
import { isNotEmptyValidationOptions } from '@shared/validation';

export class BaseEvaluationDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString()
  readonly results: string;
}
