import { PartialType } from '@nestjs/swagger';
import { BasePersonDto } from './base-person.dto';

export class UpdatePersonDto extends PartialType(BasePersonDto) {}
