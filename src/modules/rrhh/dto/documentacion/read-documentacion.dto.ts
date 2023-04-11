import { Exclude, Expose } from 'class-transformer';
import { BaseDocumentacionDto } from './base-documentacion.dto';

@Exclude()
export class ReadDocumentacionDto extends BaseDocumentacionDto {
  @Expose()
  readonly id;

  @Expose()
  readonly results;
}
