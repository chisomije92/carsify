/* eslint-disable prettier/prettier */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    //const { userId } = request.session;
    if (request.session) {
      const { userId } = request.session;
      if (userId) {
        const user = await this.userService.findOne(userId);
        request.currentUser = user;
      }
    }
    //if (request?.session?.userId) {
    //  const user = await this.userService.findOne(request?.session?.userId);
    //  request.currentUser = user;
    //}

    return next.handle();
  }
}
