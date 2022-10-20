import { Model } from 'mongoose';
import { UserDocument } from '../users/user.schema';
export declare class UserReportsServiceService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}
