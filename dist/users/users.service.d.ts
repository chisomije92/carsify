import { Model, Types } from 'mongoose';
import { ReportsService } from '../reports/reports.service';
import { User, UserDocument } from './user.schema';
export declare class UsersService {
    private userRepo;
    private reportService;
    constructor(userRepo: Model<UserDocument>, reportService: ReportsService);
    create(email: string, password: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    findOne(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    find(email: string): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    })[]>;
    update(id: string, attrs: Partial<User>): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: Types.ObjectId;
    }>;
    remove(id: string): Promise<any>;
}
