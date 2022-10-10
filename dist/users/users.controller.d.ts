import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.schema';
export declare class UsersController {
    private userService;
    private authService;
    constructor(userService: UsersService, authService: AuthService);
    createUser(body: CreateUserDto, session: Record<'userId', string>): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signIn(body: CreateUserDto, session: Record<'userId', string>): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signOut(session: any): void;
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
}
