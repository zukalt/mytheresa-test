import { ProductSearchService } from './product-search.service';
import { ProductsStorage } from './products-storage';
import { Product } from './types';

describe('ProductSearchService spec', () => {
  describe('Basic search', () => {
    const searchService = new ProductSearchService(new ProductsStorage());

    it('Must return at most 5 elements.', () => {
      const products = searchService.findBy({});
      expect(products.length).toBe(5);
    });

    test('search by category', () => {
      const products = searchService.findBy({ category: 'boots' });
      expect(products.length).toBe(5);
      products.forEach((p) => {
        expect(p.category).toBe('boots');
      });
    });

    test('search by price with less than and equal', () => {
      let products = searchService.findBy({ priceLessThan: '59000' });
      expect(products.length).toBeLessThanOrEqual(5);
      products.forEach((p) => {
        expect(p.price).toBeLessThanOrEqual(59000);
      });

      products = searchService.findBy({ priceLessThan: '89000' });
      expect(products.length).toBeLessThanOrEqual(5);
      products.forEach((p) => {
        expect(p.price).toBeLessThanOrEqual(89000);
      });

      products = searchService.findBy({ priceLessThan: '1' });
      expect(products.length).toBe(0);
    });
  });

  describe('Performance Tests', () => {
    class ProductsMegaStorage extends ProductsStorage {
      fetchAll(): Product[] {
        const products: Product[] = [];

        for (let i = 0; i < 50000; i++) {
          products.push({
            sku: ('00000' + i).slice(-6),
            name: `Product #${i}`,
            category: 'category' + (i % 50),
            price: 100 + i,
          });
        }
        products.push({
          sku: '150000',
          name: `Product #150000`,
          category: 'category-x',
          price: 50,
        });
        return products;
      }
    }
    const searchService = new ProductSearchService(new ProductsMegaStorage());

    test('search by category', () => {
      let products = searchService.findBy({ category: 'category1' });
      expect(products.length).toBe(5);

      products = searchService.findBy({ category: 'category-x' });
      expect(products.length).toBe(1);
    });

    test('search by price', () => {
      let products = searchService.findBy({ priceLessThan: '100' });
      expect(products.length).toBe(2);

      products = searchService.findBy({ priceLessThan: '104' });
      expect(products.length).toBe(5);
    });
  });
});
