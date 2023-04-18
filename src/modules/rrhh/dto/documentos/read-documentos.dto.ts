import { Exclude, Expose } from 'class-transformer';
import { BaseDocumentosDto } from './base-documentos.dto';

@Exclude()
export class ReadDocumentosDto extends BaseDocumentosDto {
  @Expose()
  readonly id;

  @Expose()
  readonly user;

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
}
