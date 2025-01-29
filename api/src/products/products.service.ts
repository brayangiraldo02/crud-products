import { Injectable } from '@nestjs/common';
import { pgservice } from 'src/postgres/pg-service';
import { Product } from './interface/product.inteface';
import { get_product_dto, create_product_dto } from './dto';
import { update_product_dto } from './dto/update_product_dto';

@Injectable()
export class ProductsService {
  constructor(private readonly pg_service: pgservice) { }

  async get_products(): Promise<get_product_dto[]> {
    try {
      const query = 'SELECT * FROM product WHERE status = true';
      const result = (await this.pg_service.query(query)) as {
        rows: Product[];
      };

      const productsDto: get_product_dto[] = result.rows.map((product) => {
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
        };
      });

      return productsDto;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async get_products_by_id(id: number): Promise<get_product_dto | null> {
    try {
      const query = `SELECT * FROM product WHERE id = $1 AND status = true`;
      const result = (await this.pg_service.query(query, [id])) as {
        rows: Product[];
      };

      if (result.rows.length === 0) {
        return null;
      }

      const productDto: get_product_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      return productDto;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      return null;
    }
  }

  async create_product(
    product: create_product_dto,
  ): Promise<get_product_dto | null> {
    try {
      const query = `INSERT INTO product (name, description, price, stock, status) VALUES (
                    '${product.name}', 
                    '${product.description}', 
                    ${product.price}, 
                    ${product.stock},true) RETURNING *`;
      const result = (await this.pg_service.query(query)) as {
        rows: Product[];
      };
      const productDto: get_product_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      console.log(typeof productDto.price);
      return productDto;
    } catch (error) {
      console.error('Error creating product:', error);
      return null;
    }
  }

  async update_product(
    id: number,
    prodcut: update_product_dto,
  ): Promise<get_product_dto | null> {
    try {
      let query = `UPDATE product SET `;
      if (prodcut.name) {
        query += `name = '${prodcut.name}', `;
      }
      if (prodcut.description) {
        query += `description = '${prodcut.description}', `;
      }
      if (prodcut.price) {
        query += `price = ${prodcut.price}, `;
      }
      if (prodcut.stock) {
        query += `stock = ${prodcut.stock}, `;
      }
      query = query.slice(0, -2);
      query += ` WHERE id = ${id} RETURNING *`;
      const result = (await this.pg_service.query(query)) as {
        rows: Product[];
      };
      if (result.rows.length === 0) {
        return null;
      }
      const productDto: get_product_dto = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        description: result.rows[0].description,
        price: result.rows[0].price,
        stock: result.rows[0].stock,
      };
      return productDto;
    } catch (error) {
      console.error('Error updating product:', error);
      return null;
    }
  }

  async verify_delete(id: number): Promise<boolean> {
    try {
      const query = `SELECT status FROM product WHERE id = $1`;
      const result = (await this.pg_service.query(query, [id])) as {
        rows: { status: boolean }[];
      };

      if (result.rows.length === 0) {
        return false;
      }

      return result.rows[0].status === false;
    } catch (error) {
      console.error('Error verifying delete:', error);
      return false;
    }
  }

  async delete_prodcut(id: number): Promise<boolean> {
    try {
      const query = `UPDATE product SET status = false WHERE id = ${id} RETURNING *`;
      const result = (await this.pg_service.query(query)) as {
        rows: Product[];
      };

      if (result.rows.length === 0) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
}
