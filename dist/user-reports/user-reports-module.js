"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReportsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const reports_module_1 = require("../reports/reports.module");
const user_schema_1 = require("../users/user.schema");
const users_module_1 = require("../users/users.module");
const user_reports_service_1 = require("./user-reports-service");
const user_reports_controller_1 = require("./user-reports.controller");
let UserReportsModule = class UserReportsModule {
};
UserReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            users_module_1.UsersModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [user_reports_controller_1.UserReportsController],
        providers: [user_reports_service_1.UserReportsService],
        exports: [user_reports_service_1.UserReportsService],
    })
], UserReportsModule);
exports.UserReportsModule = UserReportsModule;
//# sourceMappingURL=user-reports-module.js.map