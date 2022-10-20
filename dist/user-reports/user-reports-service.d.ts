import { CreateReportDto } from '../reports/dtos/create-report.dto';
import { GetEstimateDto } from '../reports/dtos/get-estimate.dto';
import { ReportsService } from '../reports/reports.service';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';
export declare class UserReportsService {
    private reportService;
    private userService;
    constructor(reportService: ReportsService, userService: UsersService);
    remove(id: string): Promise<any>;
    createReports(reportBody: CreateReportDto, relatedUser: User): Promise<import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createEstimate(report: GetEstimateDto): Promise<(import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    changeApproval(id: string, approved: boolean): Promise<import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
