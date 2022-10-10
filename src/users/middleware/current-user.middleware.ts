/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(request: Request, res: Response, Next: NextFunction) {
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);

      request.currentUser = user;
    }

    Next();
  }
}
