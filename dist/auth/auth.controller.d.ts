import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.schema';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { updateUserPasswordDto } from '../users/dtos/update-user-password.dtos';
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signIn(body: CreateUserDto, session: Record<'token', string>): Promise<{
        accessToken: string;
    }>;
    signOut(session: Record<'token', string>): void;
    whoAmI(user: User): User;
    findUser(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAllUsers(email: string): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    removeUser(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateUser(id: string, body: UpdateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    changeUserPassword({ email, oldPassword, newPassword }: updateUserPasswordDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
