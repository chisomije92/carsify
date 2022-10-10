/* eslint-disable prettier/prettier */

import { IsBoolean } from 'class-validator';

export class ApprovedReportDto {
  @IsBoolean()
  approved: boolean;
}
