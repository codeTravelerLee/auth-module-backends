import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const result = await this.userService.createUser(user);
    return result;
  }

  @Get('/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    return user;
  }

  @Put('/:email')
  async updateUser(@Body() user: UpdateUserDto, @Param('email') email: string) {
    const result = await this.userService.updateUser(user, email);
    return result;
  }

  @Delete('/:email')
  async deleteUser(@Param('email') email: string) {
    const result = await this.userService.deleteUser(email);
    return result;
  }
}
