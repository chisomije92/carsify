import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './users.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ReportsModule } from 'src/reports/reports.module';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule,
    ReportsModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
