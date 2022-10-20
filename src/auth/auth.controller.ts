/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  Patch,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user-dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { User } from '../users/user.schema';
import { UpdateUserDto } from '../users/dtos/update-user.dto';
import { updateUserPasswordDto } from '../users/dtos/update-user-password.dtos';
import { CurrentUser } from './decorators/current-user.decorator';

@Serialize(UserDto)
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() body: CreateUserDto,
    @Session() session: Record<'userId', string>,
  ) {
    const { user, token } = await this.authService.signIn(
      body.email,
      body.password,
    );
    session.userId = user.id;
    return {
      accessToken: token,
    };
  }

  @Post('/signout')
  signOut(@Session() session: Record<'userId', string>) {
    session.userId = null;
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Post('/changepassword')
  async changeUserPassword(
    @Body() { email, oldPassword, newPassword }: updateUserPasswordDto,
  ) {
    const user = await this.authService.changePassword(
      email,
      oldPassword,
      newPassword,
    );

    return user;
  }
}
