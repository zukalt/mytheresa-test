import { Injectable } from '@nestjs/common';

import { Product } from './types';
import { SearchQueryInput } from './dto';
import { ProductsStorage } from './products-storage';

@Injectable()
export class ProductSearchService {
  private all: Product[] = [];
  constructor(private readonly storage: ProductsStorage) {
    this.all = storage.fetchAll();
  }

  findBy(query: SearchQueryInput): Product[] {
    const result = [];
    const priceFilter = query.priceLessThan
      ? Number(query.priceLessThan)
      : Number.MAX_VALUE;
    for (let i = 0; i < this.all.length && result.length < 5; i++) {
      const p = this.all[i];
      const categoryMatches = p.category === query.category || !query.category;
      const priceMatches = p.price <= priceFilter;
      if (categoryMatches && priceMatches) {
        result.push(p);
      }
    }
    return result;
  }
}
