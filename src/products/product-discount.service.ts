import { Injectable } from '@nestjs/common';

import { Product } from './types';
import { PriceInfo, ProductDiscounted } from './dto';

abstract class Discount {
  protected constructor(public readonly percentage: number) {}
  abstract isApplicable(product: Product): boolean;
  applyDiscount(product: Product): PriceInfo {
    return {
      original: product.price,
      final: Math.ceil((product.price * (100 - this.percentage)) / 100),
      currency: 'EUR',
      discount_percentage: this.percentage > 0 ? `${this.percentage}%` : null,
    };
  }
}

class CategoryDiscount extends Discount {
  constructor(private readonly category: string, percentage: number) {
    super(percentage);
  }

  isApplicable(product: Product): boolean {
    return product.category === this.category;
  }
}
class SkuDiscount extends Discount {
  constructor(private readonly sku: string, percentage: number) {
    super(percentage);
  }
  isApplicable(product: Product): boolean {
    return product.sku === this.sku;
  }
}

class NoDiscount extends Discount {
  constructor() {
    super(0);
  }
  isApplicable() {
    return true;
  }
}

@Injectable()
export class ProductDiscountService {
  availableDiscounts: Discount[] = [
    new CategoryDiscount('boots', 30),
    new SkuDiscount('000003', 15),
    new NoDiscount(),
  ];

  applyDiscounts(products: Product[]): ProductDiscounted[] {
    return products.map((p) => ({
      ...p,
      price: this.availableDiscounts
        .find((discount) => discount.isApplicable(p))
        .applyDiscount(p),
    }));
  }
}
