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
const users_service_1 = require("./users.service");
const crypto_1 = require("crypto");
const util_1 = require("util");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
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
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
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
        });
    }
    async changePassword(email, oldPassword, newPassword) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new common_1.NotFoundException('User Not Found!');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(oldPassword, salt, 32));
        if (hash.toString('hex') !== storedHash)
            throw new common_1.BadRequestException('Bad Request. Credentials are incorrect!');
        const newHash = (await scrypt(newPassword, salt, 32));
        if (newHash.toString('hex') === hash.toString('hex'))
            throw new common_1.BadRequestException('Old password is same as new password!');
        const result = salt + '.' + newHash.toString('hex');
        Object.assign(user, { password: result });
        user.password = result;
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