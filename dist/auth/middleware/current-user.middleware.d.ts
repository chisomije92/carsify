import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
interface RequestUser extends Request {
    currentUser: any;
}
export declare class CurrentUserMiddleWare implements NestMiddleware {
    private jwtService;
    constructor(jwtService: JwtService);
    use(request: RequestUser, res: Response, next: NextFunction): Promise<void>;
}
export {};
