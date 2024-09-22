import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { User } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body() request: CreateUserDto) {
    await this.usersService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: User) {
    return this.usersService.getUsers();
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    let c = 'hello';
    return user || {};
  }
}
