import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';
interface RequestUser extends Request {
    currentUser: any;
}
export declare class CurrentUserMiddleWare implements NestMiddleware {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    use(request: RequestUser, res: Response, next: NextFunction): Promise<void>;
}
export {};
