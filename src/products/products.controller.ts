import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductSearchService } from './product-search.service';
import { ProductDiscountService } from './product-discount.service';
import { ProductDiscounted, SearchQueryInput } from './dto';

@ApiTags('search')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductSearchService,
    private readonly discountService: ProductDiscountService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description:
      'Searches products with given criteria and returns first 5 with applied discounts',
    type: ProductDiscounted,
    isArray: true,
  })
  async search(@Query() query: SearchQueryInput): Promise<ProductDiscounted[]> {
    const products = this.productsService.findBy({
      category: query.category,
      priceLessThan: query.priceLessThan,
    });
    return this.discountService.applyDiscounts(products);
  }
}
