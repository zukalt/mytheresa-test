import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductSearchService } from './product-search.service';
import { ProductDiscountService } from './product-discount.service';
import { ProductsStorage } from './products-storage';

@Module({
  controllers: [ProductsController],
  providers: [ProductSearchService, ProductDiscountService, ProductsStorage],
})
export class ProductsModule {}
