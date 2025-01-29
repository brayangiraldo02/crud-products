import { IsNumber, IsString, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class update_storage_dto {
  @ApiProperty({ description: 'Name of the storage' })
  @ApiPropertyOptional({ description: 'Name of the storage' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Description of the storage' })
  @ApiPropertyOptional({ description: 'Description of the storage' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Price of the storage' })
  @ApiPropertyOptional({ description: 'Price of the storage' })
  @IsNumber()
  @Min(0)
  @Max(999999.99)
  @IsOptional()
  price: number;

  @ApiProperty({ description: 'Stock of the storage' })
  @ApiPropertyOptional({ description: 'Stock of the storage' })
  @IsNumber()
  @IsOptional()
  stock: number;
}
