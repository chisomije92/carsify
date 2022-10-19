import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from '../users/user.schema';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(
    @Param('id') id: string,
    @Body() { approved }: ApprovedReportDto,
  ) {
    return await this.reportService.changeApproval(id, approved);
  }

  @Get()
  async getEstimate(@Query() query: GetEstimateDto) {
    return await this.reportService.createEstimate(query);
  }
}
