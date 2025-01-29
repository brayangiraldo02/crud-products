import { IsNumber, IsString, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class update_product_dto {
  @ApiProperty({ description: 'Name of the product' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Description of the product' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  @Max(999999.99)
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Stock of the product' })
  @IsNumber()
  @IsOptional()
  stock: number;
}

