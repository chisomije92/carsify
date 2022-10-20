import { CreateReportDto } from '../reports/dtos/create-report.dto';
import { UserReportsService } from './user-reports-service';
import { User } from '../users/user.schema';
import { GetEstimateDto } from '../reports/dtos/get-estimate.dto';
import { ApprovedReportDto } from '../reports/dtos/approved-report.dto';
export declare class UserReportsController {
    private usersReportService;
    constructor(usersReportService: UserReportsService);
    createReport(body: CreateReportDto, user: User): Promise<import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getEstimate(query: GetEstimateDto): Promise<(import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    approveReport(id: string, { approved }: ApprovedReportDto): Promise<import("../reports/report.schema").Report & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
