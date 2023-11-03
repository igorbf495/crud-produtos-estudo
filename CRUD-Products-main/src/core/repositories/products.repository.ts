import { Products } from '@prisma/client';
import { CreateProductsDto } from 'src/modules/products/dto/create-products.dto';
import { UpdateProductsDto } from 'src/modules/products/dto/update-products.dto';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';

type Props = {
  criteria?: ICriteria;
  pagination?: IPagination;
};

export abstract class ProductsRepository {
  abstract findAll({ criteria, pagination }: Props): Promise<Products[]>;
  abstract findBy(criteria: ICriteria): Promise<Products | null>;
  abstract save(data: CreateProductsDto): Promise<Products>;
  abstract update(data: UpdateProductsDto, id: string): Promise<Products>;
  abstract delete(id: string): Promise<void>;
};
