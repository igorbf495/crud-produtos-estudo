import { ApiProperty } from '@nestjs/swagger';
import { Products } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateProductsDto
  implements Omit<
    Products,
    'id' |
    'created_at' | 
    'updated_at'
  >
{
  @ApiProperty({ required: true, example: 'fones de ouvido' })
  @IsNotEmpty({ message: 'Campo Nome é obrigatório' })
  name: string;

  @ApiProperty({ required: true, example: '20,00' })
  @IsNotEmpty({ message: 'Campo Preço é obrigatório' })
  @Type(() => String)
  price: Decimal;

  @ApiProperty({ required: true, example: '53' })
  @IsNotEmpty({ message: 'Campo Quantidade é obrigatório' })
  quantity: number;
}
