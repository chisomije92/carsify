/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsModule } from '../reports/reports.module';
import { User, UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { UserReportsService } from './user-reports-service';
import { UserReportsController } from './user-reports.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    ReportsModule,
  ],
  controllers: [UserReportsController],
  providers: [UserReportsService],
  exports: [UserReportsService],
})
export class UserReportsModule {}
