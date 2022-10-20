"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportsController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const create_report_dto_1 = require("../reports/dtos/create-report.dto");
const user_reports_service_1 = require("./user-reports-service");
const user_schema_1 = require("../users/user.schema");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const users_report_dto_1 = require("./dtos/users-report.dto");
const get_estimate_dto_1 = require("../reports/dtos/get-estimate.dto");
const admin_guard_1 = require("../guards/admin.guard");
const approved_report_dto_1 = require("../reports/dtos/approved-report.dto");
let UserReportsController = class UserReportsController {
    constructor(usersReportService) {
        this.usersReportService = usersReportService;
    }
    async createReport(body, user) {
        return await this.usersReportService.createReports(body, user);
    }
    async getEstimate(query) {
        return await this.usersReportService.createEstimate(query);
    }
    async approveReport(id, { approved }) {
        return await this.usersReportService.changeApproval(id, approved);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, serialize_interceptor_1.Serialize)(users_report_dto_1.UserReportDto),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_report_dto_1.CreateReportDto, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserReportsController.prototype, "createReport", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_estimate_dto_1.GetEstimateDto]),
    __metadata("design:returntype", Promise)
], UserReportsController.prototype, "getEstimate", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approved_report_dto_1.ApprovedReportDto]),
    __metadata("design:returntype", Promise)
], UserReportsController.prototype, "approveReport", null);
UserReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [user_reports_service_1.UserReportsService])
], UserReportsController);
exports.UserReportsController = UserReportsController;
//# sourceMappingURL=user-reports.controller.js.map