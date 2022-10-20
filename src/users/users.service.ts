/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReportsService } from '../reports/reports.service';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<UserDocument>,
    private reportService: ReportsService,
  ) {}
  async create(email: string, password: string) {
    return await this.userRepo.create({ email, password });
  }

  async findOne(id: string) {
    if (!id) return null;
    return await this.userRepo.findById({ _id: new Types.ObjectId(id) });
  }

  async find(email: string) {
    return await this.userRepo.find({ email });
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.userRepo.findOne({ _id: new Types.ObjectId(id) });
    if (!user) {
      throw new NotFoundException(
        'You are not a registered user. Please proceed to sign up as a user!',
      );
    }
    if (attrs.password)
      throw new BadRequestException(
        'You cannot update password. Please proceed to change password for this!',
      );
    Object.assign(user, attrs);
    return await user.save();
  }

  async remove(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('This is not a registered user!');
    }
    await this.reportService.removeReports(id);
    return user.delete();
  }
}
