import { UsersService } from './users.service';
export declare class AuthService {
    private userService;
    constructor(userService: UsersService);
    signUp(email: string, password: string): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signIn(email: string, password: string): Promise<import("./user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
