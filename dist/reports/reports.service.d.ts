import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report, ReportDocument } from './report.schema';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsService {
    private reportModel;
    constructor(reportModel: Model<ReportDocument>);
    create(reportDto: CreateReportDto, user: User): Promise<Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeApproval(id: string, approved: boolean): Promise<Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createEstimate({ make, lng, lat }: GetEstimateDto): Promise<(Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    removeReports(userId: string): Promise<boolean>;
}
