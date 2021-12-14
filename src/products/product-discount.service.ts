import { Injectable } from '@nestjs/common';

import { Product } from './types';
import { ProductDiscounted } from './dto';

@Injectable()
export class ProductDiscountService {
  applyDiscounts(products: Product[]): ProductDiscounted[] {
    return products.map((p) => ({
      ...p,
      price: {
        original: p.price,
        final: p.price,
        currency: 'EUR',
        discount_percentage: null,
      },
    }));
  }
}
