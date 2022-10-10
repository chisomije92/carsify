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
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user-dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body() body: CreateUserDto,
    @Session() session: Record<'userId', string>,
  ) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() body: CreateUserDto,
    @Session() session: Record<'userId', string>,
  ) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user._id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
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
}
