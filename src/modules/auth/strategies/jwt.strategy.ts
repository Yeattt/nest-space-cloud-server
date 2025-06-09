import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'generated/prisma';

import { AuthService } from '../auth.service';
import { envs } from '../../../config';
import { IJwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  public async validate(payload: IJwtPayload): Promise<User | null> {
    const { id } = payload;
    
    const user: User | null = await this.authService.validateUser(id);

    return user;
  };
}