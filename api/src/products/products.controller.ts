import {
  Controller,
  Body,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { get_product_dto, create_product_dto } from './dto';
import { update_product_dto } from './dto/update_product_dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Return all products' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get_products(): Promise<get_product_dto[]> {
    const products = await this.productsService.get_products();
    if (!Array.isArray(products)) {
      throw new Error('Expected an array of products');
    }
    return products;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Return a product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async get_products_by_id(
    @Param('id') id_string: string,
  ): Promise<get_product_dto | null> {
    const id = parseInt(id_string);
    const product = await this.productsService.get_products_by_id(id);
    if (product) {
      return product;
    }
    throw new NotFoundException(`Product with ID ${id} not found`);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async create_product(
    @Body() product: create_product_dto,
  ): Promise<get_product_dto> {
    try {
      const product_created =
        await this.productsService.create_product(product);
      if (product_created) {
        return product_created;
      }
      throw new Error('Error creating product');
    } catch {
      throw new Error('Error creating product');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UsePipes(new ValidationPipe())
  async update_product(
    @Param('id') id_string: string,
    @Body() product: update_product_dto,
  ): Promise<get_product_dto> {
    const id = parseInt(id_string);
    const exist_product = await this.productsService.get_products_by_id(id);
    if (!exist_product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    try {
      const updated_product = await this.productsService.update_product(
        id,
        product,
      );
      if (updated_product) {
        return updated_product;
      } else {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch {
      throw new BadRequestException('Error updating product');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async delete_product(
    @Param('id') id_string: string,
  ): Promise<{ message: string }> {
    const id = parseInt(id_string);

    const is_delete = await this.productsService.verify_delete(id);
    if (is_delete) {
      throw new NotFoundException(`Product with ID ${id} is deleted `);
    }

    const deleted = await this.productsService.delete_prodcut(id);

    if (!deleted) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return { message: 'Product deleted successfully' };
  }
}
