import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import cookieSession = require('cookie-session');
import { url } from 'inspector';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    //MongooseModule.forRoot(
    //  `mongodb+srv://Jerry:Ee6vM0mUe1uihgFR@cluster0.w1dc5.mongodb.net/carsify?authMechanism=SCRAM-SHA-1`,
    //),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['xyazbxbx'],
        }),
      )
      .forRoutes('*');
  }
}
