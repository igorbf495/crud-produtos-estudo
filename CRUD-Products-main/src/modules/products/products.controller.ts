import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { InternalServerErrorResponse } from 'src/shared/dto/internal-server-error.dto';
import { NotFoundErrorResponse } from 'src/shared/dto/not-found.dto';
import { OKResponse } from 'src/shared/dto/ok.dto';
import { UnauthorizedResponse } from 'src/shared/dto/unauthorized.dto';
import { CreateProductsDto } from './dto/create-products.dto';
import { ResponseSuccessProductsDto } from './dto/response-success-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ProductsEntity } from './entities/products.entity';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiResponse({ status: HttpStatus.OK, type: ResponseSuccessProductsDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Get()
  async findAll(@Query() filters: any): Promise<ProductsEntity[]> {
    const state = await this.productsService.findAll({
      pagination: {
        page: filters?.page || 1,
        perPage: filters?.per_page || 20,
      },
      criteria: filters,
    });
    return state;
  }

  @ApiResponse({ status: HttpStatus.OK, type: ResponseSuccessProductsDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductsEntity | null> {
    const product = await this.productsService.findBy({ id });
    if (!product) throw new BadRequestException(['Produto não encontrado']);
    return new ProductsEntity(product);
  }

  @ApiResponse({ status: HttpStatus.OK, type: CreateProductsDto })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Post()
  async create(@Body() data: CreateProductsDto): Promise<ProductsEntity> {
    const state = await this.productsService.save(data);
    return new ProductsEntity(state);
  }

  @ApiResponse({ status: HttpStatus.OK, type: UpdateProductsDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateProductsDto) {
    return this.productsService.update(id, data);
  }

  @ApiResponse({ status: HttpStatus.OK, type: OKResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundErrorResponse })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    type: InternalServerErrorResponse,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
