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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_guard_1 = require("../guards/auth.guard");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const users_service_1 = require("../users/users.service");
const user_dto_1 = require("../users/dtos/user-dto");
const create_user_dto_1 = require("../users/dtos/create-user.dto");
const user_schema_1 = require("../users/user.schema");
const update_user_dto_1 = require("../users/dtos/update-user.dto");
const update_user_password_dtos_1 = require("../users/dtos/update-user-password.dtos");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async createUser(body) {
        const user = await this.authService.signUp(body.email, body.password);
        return user;
    }
    async signIn(body, session) {
        const token = await this.authService.signIn(body.email, body.password);
        session.token = token;
        return {
            accessToken: token,
        };
    }
    signOut(session) {
        session.token = null;
    }
    whoAmI(user) {
        return user;
    }
    findUser(id) {
        return this.userService.findOne(id);
    }
    findAllUsers(email) {
        return this.userService.find(email);
    }
    removeUser(id) {
        return this.userService.remove(id);
    }
    updateUser(id, body) {
        return this.userService.update(id, body);
    }
    async changeUserPassword({ email, oldPassword, newPassword }) {
        const user = await this.authService.changePassword(email, oldPassword, newPassword);
        return user;
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.Get)('/currentuser'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "whoAmI", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/changepassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_password_dtos_1.updateUserPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeUserPassword", null);
AuthController = __decorate([
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map