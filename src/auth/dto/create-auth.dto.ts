import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {}

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}

export class RegisterAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  contact: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  role: string;

  username: string;
}

export class ResetPasswordAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  email: string;
}
