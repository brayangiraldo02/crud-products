import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product, ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async get_products(): Promise<Product[]> {
    return await this.productsService.get_products();
  }

  @Get(':id')
  async get_products_by_id(
    @Param('id') id_string: string,
  ): Promise<Product | null> {
    const id = parseInt(id_string);
    const product = await this.productsService.get_products_by_id(id);
    if (product) {
      return product;
    }
    return null;
  }
}
