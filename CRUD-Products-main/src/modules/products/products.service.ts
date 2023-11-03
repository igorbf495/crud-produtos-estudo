import { ProductsRepository } from '@core/repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';

type Props = {
  criteria?: ICriteria;
  pagination?: IPagination;
};

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll({ criteria, pagination }: Props): Promise<Products[]> {
    return await this.productsRepository.findAll({ criteria, pagination });
  }

  async findBy(criteria: ICriteria): Promise<Products | null> {
    return await this.productsRepository.findBy(criteria);
  }

  async save(data: CreateProductsDto): Promise<Products> {
    return await this.productsRepository.save(data);
  }

  async update(id: string, data: UpdateProductsDto): Promise<Products> {
    return await this.productsRepository.update(data, id);
  }

  async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
