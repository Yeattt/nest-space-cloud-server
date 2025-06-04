import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(3)
  public password: string;

  @IsBoolean()
  @Type(() => Boolean)
  public isActive: boolean;
}