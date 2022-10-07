/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import CookieSession = require('cookie-session');

export const setUpApp = (app: INestApplication) => {
  app.use(
    CookieSession({
      keys: ['asdfadf'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
