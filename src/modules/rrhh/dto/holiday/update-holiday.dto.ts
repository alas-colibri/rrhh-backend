import { PartialType } from '@nestjs/swagger';
import { BaseHolidayDto } from './base-holiday.dto';

export class UpdateHolidayDto extends PartialType(BaseHolidayDto) {}
