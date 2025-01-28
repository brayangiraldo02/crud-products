import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  status: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'product 1',
    description: 'Description for product 1',
    stock: 10,
    price: 100,
    status: true,
  },
  {
    id: 2,
    name: 'product 2',
    description: 'Description for product 2',
    stock: 20,
    price: 200,
    status: true,
  },
];

@Injectable()
export class ProductsService {
  constructor() {}

  get_products(): Promise<Product[]> {
    return new Promise((resolve) => {
      resolve(products);
    });
  }

  get_products_by_id(id: number): Promise<Product | null> {
    return new Promise((resolve) => {
      // try {
      const product = products.find((product) => product.id === id);
      if (product) {
        resolve(product);
      } else {
        resolve(null);
      }
      // } catch {
      //   reject(null);
      // }
    });
  }
}
