import { PartialType } from '@nestjs/swagger';
import { BaseDocumentosDto } from './base-documentos.dto';

export class UpdateDocumentosDto extends PartialType(BaseDocumentosDto) {}
