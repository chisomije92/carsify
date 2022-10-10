import mongoose, { Document, Types } from 'mongoose';
import { Report } from '../reports/report.schema';
export declare type UserDocument = User & Document;
export declare class User {
    _id: Types.ObjectId;
    email: string;
    password: string;
    admin: boolean;
    reports: Report[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
