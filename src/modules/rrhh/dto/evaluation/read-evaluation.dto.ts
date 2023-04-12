import { Exclude, Expose } from 'class-transformer';
import { BaseEvaluationDto } from './base-evaluation.dto';

@Exclude()
export class ReadEvaluationDto extends BaseEvaluationDto {
  @Expose()
  readonly id;

  @Expose()
  readonly name;

  @Expose()
  readonly note1;

  @Expose()
  readonly note2;

  @Expose()
  readonly note3;

  @Expose()
  readonly note4;

  @Expose()
  readonly note5;

  @Expose()
  readonly question1;

  @Expose()
  readonly question2;

  @Expose()
  readonly question3;

  @Expose()
  readonly question4;

  @Expose()
  readonly question5;

  @Expose()
  readonly observation;

  @Expose()
  readonly noteF;
}
