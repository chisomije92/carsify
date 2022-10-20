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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const reports_service_1 = require("../reports/reports.service");
let UsersService = class UsersService {
    constructor(userRepo, reportService) {
        this.userRepo = userRepo;
        this.reportService = reportService;
    }
    async create(email, password) {
        return await this.userRepo.create({ email, password });
    }
    async findOne(id) {
        if (!id)
            return null;
        return await this.userRepo.findById({ _id: new mongoose_2.Types.ObjectId(id) });
    }
    async find(email) {
        return await this.userRepo.find({ email });
    }
    async update(id, attrs) {
        const user = await this.userRepo.findOne({ _id: new mongoose_2.Types.ObjectId(id) });
        if (!user) {
            throw new common_1.NotFoundException('You are not a registered user. Please proceed to sign up as a user!');
        }
        if (attrs.password)
            throw new common_1.BadRequestException('You cannot update password. Please proceed to change password for this!');
        Object.assign(user, attrs);
        return await user.save();
    }
    async remove(id) {
        const user = await this.userRepo.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('This is not a registered user!');
        }
        await this.reportService.removeReports(id);
        return user.delete();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        reports_service_1.ReportsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map