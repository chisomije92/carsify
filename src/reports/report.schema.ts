/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
  _id: Types.ObjectId;

  @Prop()
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
}

export const ReportSchema = SchemaFactory.createForClass(Report);
