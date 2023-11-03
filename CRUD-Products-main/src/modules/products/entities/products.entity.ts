import { ApiProperty } from '@nestjs/swagger';
import { Products } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Type } from 'class-transformer';

export class ProductsEntity implements Products {

  constructor(partial: Partial<ProductsEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Type(() => String)
  price: Decimal;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date | null;

}
