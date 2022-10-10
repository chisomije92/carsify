/* eslint-disable prettier/prettier */
import { User } from './users/user.schema';

declare module 'Express' {
  interface Request {
    currentUser?: User;
  }
}
