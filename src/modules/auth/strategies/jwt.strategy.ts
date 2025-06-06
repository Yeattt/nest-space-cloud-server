import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'generated/prisma';

import { PrismaService } from 'src/prisma/prisma.service';
import { envs } from '../../../config';
import { IJwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwtSecret,
    });
  }

  public async validate(payload: IJwtPayload): Promise<User | null> {
    const { id } = payload;
    
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`User not found`);
    };

    return user;
  };
}