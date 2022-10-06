/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepo: Model<UserDocument>) {}
  async create(email: string, password: string) {
    return await this.userRepo.create({ email, password });
  }

  async findOne(id: string) {
    if (!id) return null;
    return await this.userRepo.findOne({ _id: new Types.ObjectId(id) });
  }

  async find(email: string) {
    return await this.userRepo.find({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepo.findOne({ _id: new Types.ObjectId(id) });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return await user.save();
  }

  async remove(id: string) {
    const user = await this.userRepo.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
