import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // private readonly usersService: UsersService;

  @Post('/login')
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const result = this.authService.login(email, password);
      return result;
    } catch (err) {
      console.log(err);
      throw new HttpException('message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
