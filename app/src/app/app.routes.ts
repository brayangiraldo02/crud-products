import { Routes } from '@angular/router';
import { ProductsTableComponent } from './components/layout/products/products-table/products-table.component';
import { StorageComponent } from './components/layout/storage/storage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsTableComponent},
  { path: 'storage', component: StorageComponent },
];
