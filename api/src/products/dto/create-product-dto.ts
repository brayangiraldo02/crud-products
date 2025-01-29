import { IsNumber, IsString, MinLength, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class create_product_dto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  @Max(999999.99)
  price: number;

  @ApiProperty({ description: 'Stock of the product' })
  @IsNumber()
  stock: number;
}
