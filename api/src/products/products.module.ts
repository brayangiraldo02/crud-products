import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { pgservice } from 'src/postgres/pg-service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, pgservice],
})
export class ProductsModule {}
