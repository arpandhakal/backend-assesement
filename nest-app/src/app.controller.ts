import { Controller, Get, Render, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/hi')
  // getHi(): string {
  //   return this.appService.getHi();
  // }

  // @Get('/num')
  // getNum(): number {
  //   return this.appService.getNum();
  // }

  @Get()
  @Render('index')
  root() {
    return { view: 'index' };
  }

  @Get('/login')
  @Render('login')
  login() {
    return { view: 'login' };
  }

  @Get('/signup')
  @Render('signup')
  signup() {
    return { view: 'signup' };
  }

  @Post('add')
  @Render('index')
  addNumbers(@Body('num1') num1, @Body('num2') num2) {
    const result = +num1 + +num2;
    return { result };
  }
}
