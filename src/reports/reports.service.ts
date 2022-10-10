import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report, ReportDocument } from './report.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  create(reportDto: CreateReportDto) {
    const report = this.reportModel.create(reportDto);
    return report;
  }
}
