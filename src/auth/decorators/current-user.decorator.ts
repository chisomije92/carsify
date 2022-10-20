/* eslint-disable prettier/prettier */
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const { currentUser } = request;
    if (!currentUser) {
      throw new UnauthorizedException('Not authorized. Please log in');
    }

    return currentUser;
  },
);
