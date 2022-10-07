/* eslint-disable prettier/prettier */
import { connection } from 'mongoose';

global.afterEach(async () => {
  await connection.close();
});
