import { Routes } from '@angular/router';
import { ProductsComponent } from './components/layout/products/products.component';
import { StorageComponent } from './components/layout/storage/storage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent},
  { path: 'storage', component: StorageComponent },
];
