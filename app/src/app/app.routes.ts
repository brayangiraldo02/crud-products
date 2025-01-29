import { Routes } from '@angular/router';
import { ProductsTableComponent } from './components/layout/products/products-table/products-table.component';
import { StorageTableComponent } from './components/layout/storage/storage-table/storage-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsTableComponent},
  { path: 'storage', component: StorageTableComponent },
];
