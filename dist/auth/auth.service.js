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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signUp(email, password) {
        const users = await this.userService.find(email);
        if (users.length) {
            throw new common_1.BadRequestException('email in use');
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await this.userService.create(email, hashedPassword);
        return user;
    }
    async signIn(email, password) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new common_1.NotFoundException('User Not Found!');
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new common_1.BadRequestException('Bad Request. Credentials are incorrect!');
        }
        return this.jwtService.sign({
            email: user.email,
            id: user.id,
        }, {
            expiresIn: '60m',
        });
    }
    async changePassword(email, oldPassword, newPassword) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new common_1.NotFoundException('User Not Found!');
        }
        const salt = 10;
        const oldHashedPassword = await bcrypt.hash(oldPassword, salt);
        const isValid = await bcrypt.compare(oldPassword, user.password);
        if (!isValid) {
            throw new common_1.BadRequestException('Bad Request. Credentials are incorrect!');
        }
        const isEqual = await bcrypt.compare(newPassword, oldHashedPassword);
        if (isEqual) {
            throw new common_1.BadRequestException('Old password is same as new password!');
        }
        const newHashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = newHashedPassword;
        return await user.save();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map