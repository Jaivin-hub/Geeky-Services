import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Galen Slixby' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'lyhxr@example.com' })
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'galen@122134' })
  password: string;

  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '+380912345678' })
  contact: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'user/admin' })
  role: string;
}
