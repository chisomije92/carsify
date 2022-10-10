/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report, ReportDocument } from './report.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = new this.reportModel(reportDto);
    report.user = user;
    return await report.save();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.reportModel.findById(id);
    if (!report) throw new NotFoundException('Report not found!');
    report.approved = approved;
    return await report.save();
  }
}
