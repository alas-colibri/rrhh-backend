import { PartialType } from '@nestjs/swagger';
import { BaseProjectAssignmentDto } from './base-projectAssignment.dto';

export class UpdateProjectAssignmentDto extends PartialType(
  BaseProjectAssignmentDto,
) {}
