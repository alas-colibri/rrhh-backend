import { PartialType } from '@nestjs/swagger';
import { BaseDocumentacionDto } from './base-documentacion.dto';

export class UpdateDocumentacionDto extends PartialType(BaseDocumentacionDto) {}
