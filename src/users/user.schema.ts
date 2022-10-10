/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Report } from '../reports/report.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  admin: boolean;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: () => Report,
      },
    ],
  })
  reports: Report[];
}

export const UserSchema = SchemaFactory.createForClass(User);
