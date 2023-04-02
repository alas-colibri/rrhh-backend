import { PartialType } from '@nestjs/swagger';
import { BaseProyectDto } from './base-proyect.dto';

export class UpdateEventDto extends PartialType(BaseProyectDto) {}
