/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report, ReportDocument } from './report.schema';
import { NotFoundException } from '@nestjs/common';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { User } from '../users/user.schema';

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

  async createEstimate({ make, lng, lat }: GetEstimateDto) {
    return await this.reportModel
      .find({ make: make })
      .where('make')
      .equals(make)
      .where('lng', lng)
      .gte(-45)
      .lte(45)
      .where('lat', lat)
      .gte(-45)
      .lte(45)
      .sort('-mileage')
      .limit(3);
  }

  async removeReports(userId: string) {
    const deletedDocuments = await this.reportModel.deleteMany({
      user: userId,
    });
    return deletedDocuments.acknowledged;
  }

  async findRelatedReports(userId: string) {
    return await this.reportModel.find({ user: userId });
  }
}
