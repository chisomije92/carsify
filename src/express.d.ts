/* eslint-disable prettier/prettier */

import { User } from './users/user.entity';
declare module 'Express' {
  interface Request {
    currentUser: User;
  }
}
