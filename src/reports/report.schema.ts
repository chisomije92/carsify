/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  _id: Types.ObjectId;

  @Prop({ default: false })
  approved: boolean;

  @Prop()
  price: number;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  lng: number;

  @Prop()
  lat: number;

  @Prop()
  mileage: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: () => User,
  })
  user: User;
}

export const ReportSchema = SchemaFactory.createForClass(Report);
