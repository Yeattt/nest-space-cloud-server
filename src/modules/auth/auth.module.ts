import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { envs } from '../../config';
import { JwtStrategy } from './strategies';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: envs.jwtSecret,
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  exports: [JwtStrategy, JwtModule, PassportModule],
})
export class AuthModule { }
