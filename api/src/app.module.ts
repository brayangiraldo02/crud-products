import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [ProductsModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
