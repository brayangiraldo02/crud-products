import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class update_storage_dto {
  @ApiProperty({ description: 'location' })
  @ApiPropertyOptional({ description: 'location' })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({ description: 'quantity' })
  @ApiPropertyOptional({ description: 'quantity' })
  @IsNumber()
  @IsOptional()
  quantity: number;
}
