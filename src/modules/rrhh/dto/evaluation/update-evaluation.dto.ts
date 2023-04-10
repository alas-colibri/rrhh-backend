import { PartialType } from '@nestjs/swagger';
import { BaseEvaluationDto } from './base-evaluation.dto';

export class UpdateEvaluationDto extends PartialType(BaseEvaluationDto) {}
