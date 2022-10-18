/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signUp(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.create(email, hashedPassword);
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new BadRequestException('Bad Request. Credentials are incorrect!');
    }
    const auth = {
      token: this.jwtService.sign({
        email: user.email,
        id: user.id,
      }),
      user: user,
    };
    return auth;
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
    const salt = 10;
    const oldHashedPassword = await bcrypt.hash(oldPassword, salt);
    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      throw new BadRequestException('Bad Request. Credentials are incorrect!');
    }
    const isEqual = await bcrypt.compare(newPassword, oldHashedPassword);
    if (isEqual) {
      throw new BadRequestException('Old password is same as new password!');
    }
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = newHashedPassword;
    return await user.save();
  }
}
