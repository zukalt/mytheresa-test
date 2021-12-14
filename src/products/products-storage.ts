import { Injectable } from '@nestjs/common';

import { Product } from './types';
import * as data from './data/products.json';

@Injectable()
export class ProductsStorage {
  fetchAll(): Product[] {
    return data.products;
  }
}
