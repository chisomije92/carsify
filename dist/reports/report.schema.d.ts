import mongoose, { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';
export declare type ReportDocument = Report & Document;
export declare class Report {
    _id: Types.ObjectId;
    approved: boolean;
    price: number;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    mileage: number;
    user: User;
}
export declare const ReportSchema: mongoose.Schema<Report, mongoose.Model<Report, any, any, any, any>, {}, {}, {}, {}, "type", Report>;
