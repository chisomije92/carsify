/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

interface RequestUser extends Request {
  currentUser: any;
}
@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async use(request: RequestUser, res: Response, next: NextFunction) {
    const authToken = request.get('authorization');
    if (!authToken) {
      next();
      return;
    }
    const token = authToken.split(' ')[1];
    try {
      const authUser = await this.jwtService.verify(token);
      const user = await this.usersService.findOne(authUser.id);
      if (user) {
        request.currentUser = user;
      }
    } catch (err) {
      request.currentUser = null;
    }

    next();
  }
}
