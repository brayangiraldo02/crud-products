import { IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class create_storage_dto {
  @ApiProperty({ description: 'location' })
  @IsString()
  @MinLength(1)
  location: string;

  @ApiProperty({ description: 'quantity' })
  @IsNumber()
  quantity: number;
}
