import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from '../users/user.schema';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApprovedReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
