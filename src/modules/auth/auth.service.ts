import { BadRequestException, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

import { SignUpDto, SignInDto } from './dto';
import { IJwtPayload } from './interfaces';
import { envs } from '../../config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger('Auth-Service');

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  public async refreshToken(rToken: string) {
    try {
      const { ...userFromToken } = this.jwtService.verify(rToken, {
        secret: envs.jwtSecret,
      });

      const user: User | null = await this.validateUser(userFromToken.sub);

      if (user?.refreshToken !== rToken) {
        throw new UnauthorizedException('Invalid token');
      };

      const { accessToken, refreshToken } = await this.signJWT(user);

      return {
        ok: true,
        user,
        accessToken,
        refreshToken,
      }
    } catch (error) {
      this.logger.error(error);

      throw new UnauthorizedException(`Invalid token`);
    }
  };

  private async signJWT(payload: IJwtPayload) {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m', secret: envs.jwtSecret });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '24h', secret: envs.jwtSecret });

    return {
      accessToken,
      refreshToken,
    };
  };

  public async signUp(signUpDto: SignUpDto) {
    const hashedPass: string = bcrypt.hashSync(signUpDto.password, 10);

    try {
      const newUser: User = await this.prismaService.user.create({
        data: {
          ...signUpDto,
          password: hashedPass,
        },
      });

      const { password, ...user } = newUser;

      const { accessToken, refreshToken } = await this.signJWT(user);

      return {
        ok: true,
        message: 'User created successfully',
        user,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(`This email is already registered`);
      };
    };
  };

  public async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Incorrect credentials, try again`);
    };

    if (!bcrypt.compareSync(password, user?.password)) {
      throw new UnauthorizedException(`Incorrect credentials, try again`);
    };

    const { accessToken, refreshToken } = await this.signJWT(user);

    user.refreshToken = refreshToken;

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    })

    return {
      ok: true,
      message: 'User logged successfully!',
      accessToken,
      refreshToken,
    };
  };

  public async validateUser(id: string): Promise<User | null> {
    const user: User | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    };

    return user;
  };
}
