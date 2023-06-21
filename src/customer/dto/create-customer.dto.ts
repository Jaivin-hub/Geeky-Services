import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Galen Slixby' })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'lyhxr@example.com' })
  email: string;

  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '+380912345678' })
  contact: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'galen@122134' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'customer' })
  role: string;

  @IsString()
  @ApiProperty({ type: String, example: 'main rd 23 galwxy' })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'India' })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Palakkad' })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Kerala' })
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: '678596' })
  postalCode: number;
}
