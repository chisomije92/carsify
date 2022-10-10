import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from '../users/user.schema';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsController {
    private reportService;
    constructor(reportService: ReportsService);
    createReport(body: CreateReportDto, user: User): Promise<import("./report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    approveReport(id: string, { approved }: ApprovedReportDto): Promise<import("./report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getEstimate(query: GetEstimateDto): Promise<(import("./report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
