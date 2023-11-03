import { ProductsRepository } from '@core/repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { PrismaClient, Products } from '@prisma/client';
import { CreateProductsDto } from 'src/modules/products/dto/create-products.dto';
import { UpdateProductsDto } from 'src/modules/products/dto/update-products.dto';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';

type Props = {
  criteria?: ICriteria;
  pagination: IPagination;
};

@Injectable()
export default class PrismaProductsRepository implements ProductsRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll({ criteria, pagination }: Props): Promise<Products[]> {
    const page = pagination.page || 1;
    const perPage = pagination.perPage || 20;
    const skip = (page - 1) * perPage;

    const where: any = {};

    if (criteria?.name) {
      where.name = {contains: criteria?.name, mode: 'insensitive'};
    }

    return await this.prisma.products.findMany({
      where: where,
      take: +perPage,
      skip: +skip,
    });
  }

  async findBy(criteria: ICriteria): Promise<Products | null> {
    return await this.prisma.products.findFirst({ where: criteria });
  }

  async save(products: CreateProductsDto): Promise<Products> {
    return await this.prisma.products.create({ data: products });
  }

  async update(products: UpdateProductsDto, id: string): Promise<Products> {
    return await this.prisma.products.update({
      where: { id },
      data: products,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.products.delete({
      where: { id },
    });
  }
}
