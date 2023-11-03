import { ProductsRepository } from '@core/repositories/products.repository';
import PrismaProductsRepository from '@infra/prisma/repositories/prisma-products.repository';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';


@Module({
    controllers: [ProductsController],
    providers: [
      ProductsService,
      { provide: ProductsRepository, useClass: PrismaProductsRepository },
    ],
    exports: [ProductsService],
    imports: [],
  })
  export class ProductsModule {}