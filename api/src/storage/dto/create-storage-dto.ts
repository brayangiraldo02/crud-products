import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class create_storage_dto {
  @ApiProperty({ description: 'Name of the storage' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ description: 'Description of the storage' })
  @IsString()
  @MinLength(1)
  description: string;

  @ApiProperty({ description: 'Price of the storage' })
  @IsNumber()
  @Min(0)
  @Max(999999.99)
  price: number;

  @ApiProperty({ description: 'Stock of the storage' })
  @IsNumber()
  stock: number;
}
