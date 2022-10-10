import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
interface RequestUser extends Request {
    currentUser: any;
}
export declare class CurrentUserMiddleWare implements NestMiddleware {
    private usersService;
    constructor(usersService: UsersService);
    use(request: RequestUser, res: Response, Next: NextFunction): Promise<void>;
}
export {};
