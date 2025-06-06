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


  public async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      const newToken: string = await this.signJWT(user);

      return {
        ok: true,
        user,
        token: newToken,
      }
    } catch (error) {
      this.logger.error(error);

      throw new UnauthorizedException(`Invalid token`);
    }
  };

  public async signJWT(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
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

      const jwt: string = await this.signJWT(user);

      return {
        ok: true,
        message: 'User created successfully',
        user,
        token: jwt
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

    const jwt: string = await this.signJWT(user);

    return {
      ok: true,
      message: 'User logged successfully!',
      token: jwt,
    };
  };
}
