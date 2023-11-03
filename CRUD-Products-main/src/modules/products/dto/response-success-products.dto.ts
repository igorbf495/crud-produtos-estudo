import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class ResponseSuccessProductsDto {
  @ApiProperty({
    example: [
      {
        id: '78b0657b-bea3-48e4-9fa4-676d8f96d885',
        name: 'Bahia',
        price: '20,00',
        quantity: 53,
        created_at: '2023-04-27T11:22:35',
        updated_at: '2023-04-27T11:22:35',
      },
    ],
  })
  data: { 
    id: string; 
    name: string; 
    price: Decimal;
    quantity: number;
    created_at: Date;
    updated_at: Date;
  };
}
