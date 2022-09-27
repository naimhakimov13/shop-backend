import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body, UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async getUsers() {
    return await this.authService.getUsers();
  }

  @UsePipes(new ValidationPipe())
  @Post('/register')
  async register(@Body() user: UserDto) {
    const usersResult = await this.authService.register(user);
    const userCopy = JSON.parse(JSON.stringify(usersResult))
    return this.authService.buildUserResponse(userCopy);
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(@Body() user: LoginDto) {
    const usersResult = await this.authService.login(user);
    const userCopy = JSON.parse(JSON.stringify(usersResult));
    return this.authService.buildUserResponse(userCopy);
  }

  @UseGuards(AuthGuard)
  @Post('/token')
  checkToken(@Body('token') token: string) {
    return this.authService.checkToken(token);
  }

  @Post('/drop')
  async drop() {
    return await this.authService.dropUsers();
  }
}
