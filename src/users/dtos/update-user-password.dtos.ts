/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class updateUserPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  newPassword: string;

  @IsString()
  oldPassword: string;
}
