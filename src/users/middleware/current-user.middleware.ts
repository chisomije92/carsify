/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UsersService } from '../users.service';

interface RequestUser extends Request {
  currentUser: any;
}
@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(request: RequestUser, res: Response, Next: NextFunction) {
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;
    }

    Next();
  }
}
