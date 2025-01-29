export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
