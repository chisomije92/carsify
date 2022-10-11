/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userService.create(email, result);
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('Bad Request. Credentials are incorrect!');
    return user;
  }

  async changePassword(
    email: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(oldPassword, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('Bad Request. Credentials are incorrect!');
    const newHash = (await scrypt(newPassword, salt, 32)) as Buffer;
    if (newHash.toString('hex') === hash.toString('hex'))
      throw new BadRequestException('Old password is same as new password!');
    const result = salt + '.' + newHash.toString('hex');
    Object.assign(user, { password: result });
    user.password = result;
    return await user.save();
  }
}
