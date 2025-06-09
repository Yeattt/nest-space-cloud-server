import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { Auth, GetUser } from './decorators';
import { User } from 'generated/prisma';

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

  @Get('refresh-token/:rToken')
  public refreshToken(
    @Param('rToken') rToken: string,
  ) {
    return this.authService.refreshToken(rToken);
  }
}
