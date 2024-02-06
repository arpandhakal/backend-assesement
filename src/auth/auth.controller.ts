import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sigIn-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  signIn(@Body() signInDto: signInDto) {
    return this.authService.signIn(signInDto);
  }
}
