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
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateReportDto } from '../reports/dtos/create-report.dto';
import { UserReportsService } from './user-reports-service';
import { User } from '../users/user.schema';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserReportDto } from './dtos/users-report.dto';
import { GetEstimateDto } from '../reports/dtos/get-estimate.dto';
import { AdminGuard } from '../guards/admin.guard';
import { ApprovedReportDto } from '../reports/dtos/approved-report.dto';

@Controller('reports')
export class UserReportsController {
  constructor(private usersReportService: UserReportsService) {}
  @Post()
  @Serialize(UserReportDto)
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return await this.usersReportService.createReports(body, user);
  }

  @Get()
  async getEstimate(@Query() query: GetEstimateDto) {
    return await this.usersReportService.createEstimate(query);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async approveReport(
    @Param('id') id: string,
    @Body() { approved }: ApprovedReportDto,
  ) {
    return await this.usersReportService.changeApproval(id, approved);
  }
}
