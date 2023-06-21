import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMultibyte, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  product_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  product_description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  discount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  offer_price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean })
  status: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  sub_Category: string;

  product_image: string[];
}
