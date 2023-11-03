import { ApiProperty } from '@nestjs/swagger';
import { Products } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateProductsDto
  implements Omit<
    Products, 
    'id' | 
    'name' | 
    'price' | 
    'quantity' | 
    'created_at' | 
    'updated_at'
  >
{
  @ApiProperty({ example: 'fones de ouvido' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '20,00' })
  @IsOptional()
  @Type(() => String)
  price?: Decimal;

  @ApiProperty({ example: '53' })
  @IsOptional()
  quantity?: number;
}
