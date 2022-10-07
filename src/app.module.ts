import { Module, ValidationPipe, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { APP_PIPE } from '@nestjs/core';
import cookieSession = require('cookie-session');

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Jerry:X1t5G9uJbTLaj6yW@cluster0.w1dc5.mongodb.net/carsify?authMechanism=SCRAM-SHA-1',
    ),
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
