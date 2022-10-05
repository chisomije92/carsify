/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { find } from 'rxjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {}
  async create(email: string, password: string) {
    return await this.userRepo.create({ email, password });
  }

  async findOne(id: string) {
    return await this.userRepo.findOne({ _id: id });
  }

  async find(email: string) {
    return await this.userRepo.find({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepo.findOne({ _id: id });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return await user.save();
  }

  async remove(id: string) {
    return await this.userRepo.deleteOne({ _id: id });
  }
}
