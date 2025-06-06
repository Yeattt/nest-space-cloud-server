import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  public signUp(
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  public signIn(
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signIn(signUpDto);
  }

  @Get('verify')
  public verifyToken() {
    return this.authService.verify
  }
}
