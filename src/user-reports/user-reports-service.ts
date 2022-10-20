/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from '../reports/dtos/create-report.dto';
import { GetEstimateDto } from '../reports/dtos/get-estimate.dto';
import { ReportsService } from '../reports/reports.service';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserReportsService {
  constructor(
    private reportService: ReportsService,
    private userService: UsersService,
  ) {}

  async remove(id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('This is not a registered user!');
    }
    await this.reportService.removeReports(id);
    return user.delete();
  }

  async createReports(reportBody: CreateReportDto, relatedUser: User) {
    const report = await this.reportService.create(reportBody, relatedUser);
    const user = await this.userService.findOne(relatedUser._id.toString());
    if (!user) {
      throw new NotFoundException('This is not a registered user!');
    }
    user.reports.push(report);
    await user.save();
    return report.save();
  }

  async createEstimate(report: GetEstimateDto) {
    return await this.reportService.createEstimate(report);
  }

  async changeApproval(id: string, approved: boolean) {
    return await this.reportService.changeApproval(id, approved);
  }
}
