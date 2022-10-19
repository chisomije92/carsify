/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

interface RequestUser extends Request {
  currentUser: any;
}
@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(request: RequestUser, res: Response, next: NextFunction) {
    const { token } = request.session || {};
    try {
      const user = this.jwtService.verify(token);
      if (user) {
        request.currentUser = user;
      }
    } catch (err) {
      request.currentUser = null;
    }

    next();
  }
}
