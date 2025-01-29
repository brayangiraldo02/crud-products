import {ChangeDetectionStrategy, Component, inject,  model, signal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductCreateComponent } from '../product-create/product-create.component';
import { ApiService } from '../../../../services/api.service';

export interface ProductsTable {
  name: string;
  id: number;
  price: number;
  description: string;
  stock: number;
}

export interface ProductCreate {
  name: string;
  price: number;
  description: string;
  stock: number;
}

@Component({
  selector: 'app-products-table',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'description', 'stock', 'actions'];
  products: ProductsTable[] = [{
    id: 0,
    name: '',
    price: 0,
    description: '',
    stock: 0
  }];

  dataSource = new MatTableDataSource(this.products);

  readonly dialog = inject(MatDialog);

  readonly product_create = signal<ProductCreate>({
    name: '',
    price: 0,
    description: '',
    stock: 0
  });

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.get_products();
  }

  get_products() {
    this.api.get_data('products').subscribe((data) => {
      console.log(data);
      this.products = data;
      console.log(this.products);
      this.dataSource = new MatTableDataSource(this.products.sort((a, b) => a.id - b.id));
    });
  }

  apply_filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open_dialog_delete(id: number, name: string) {
    const dialogRef = this.dialog.open(ProductDeleteComponent, {
      data: { id, name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(`Delete ${id}`);
        this.api.delete_data(`products/${id}`).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

  resetProductCreate(): void {
    this.product_create.set({
      name: '',
      price: 0,
      description: '',
      stock: 0
    });
  }

  open_dialog_create(): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: this.product_create(),
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        const data = {
          name: result.name,
          price: Number(result.price),
          description: result.description,
          stock: Number(result.stock)
        };
        this.api.post_data('products', data).subscribe(() => {
          window.location.reload();
        });
      }
      this.resetProductCreate();
    });
  }

  open_dialog_edit(element: ProductsTable): void {
    const dialogRef = this.dialog.open(ProductCreateComponent, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        const data = {
          name: result.name,
          price: Number(result.price),
          description: result.description,
          stock: Number(result.stock)
        };
        this.api.patch_data(`products/${element.id}`, data).subscribe(() => {
          window.location.reload();
        });
        console.log(result);
      }
    });
  }
}
