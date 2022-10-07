/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import cookieSession = require('cookie-session');
import { setUpApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //app.use(
  //  cookieSession({
  //    keys: ['xyazbxbx'],
  //  }),
  //);
  setUpApp(app);
  await app.listen(3000);
}
bootstrap();
