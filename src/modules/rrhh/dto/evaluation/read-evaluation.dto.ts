import { Exclude, Expose } from 'class-transformer';
import { BaseEvaluationDto } from './base-evaluation.dto';

@Exclude()
export class ReadEvaluationDto extends BaseEvaluationDto {
  @Expose()
  readonly id;

  @Expose()
  readonly results;
}
