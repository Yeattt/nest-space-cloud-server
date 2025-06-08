import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { envs } from '../../../config';
import { IJwtPayload } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(

  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: IJwtPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '');
    return {
      ...payload,
      refreshToken
    }
  };
}