import { IsEmail, IsString, MinLength } from 'class-validator';
import { RoleEnum } from '../role.enum';

export class UserDto {

  @IsString()
  username: string

  @IsEmail()
  @IsString()
  email: string

  @MinLength(6, { message: 'Password cannot be less than 6 characters' })
  @IsString()
  password: string

  @IsString()
  role: RoleEnum
}