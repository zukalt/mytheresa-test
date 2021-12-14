import { ProductDiscountService } from './product-discount.service';

describe('ProductDiscountService Spec', () => {
  const discountService = new ProductDiscountService();

  test('Products in the boots category have a 30% discount.', () => {
    const [discountedPrice] = discountService.applyDiscounts([
      {
        sku: 'any',
        category: 'boots',
        price: 100,
        name: 'any',
      },
    ]);

    expect(discountedPrice.price).toMatchObject({
      original: 100,
      final: 70,
      currency: 'EUR',
      discount_percentage: '30%',
    });
  });

  test('The product with sku = 000003 has a 15% discount.', () => {
    const [discountedPrice] = discountService.applyDiscounts([
      {
        sku: '000003',
        category: 'any',
        price: 100,
        name: 'any',
      },
    ]);

    expect(discountedPrice.price).toMatchObject({
      original: 100,
      final: 85,
      currency: 'EUR',
      discount_percentage: '15%',
    });
  });

  test('Products in the boots category and sku = 000003 have a 30% discount.', () => {
    const [discountedPrice] = discountService.applyDiscounts([
      {
        sku: '000003',
        category: 'boots',
        price: 100,
        name: 'any',
      },
    ]);

    expect(discountedPrice.price).toMatchObject({
      original: 100,
      final: 70,
      currency: 'EUR',
      discount_percentage: '30%',
    });
  });

  test('Products in the other category have a no discount.', () => {
    const [discountedPrice] = discountService.applyDiscounts([
      {
        sku: 'any',
        category: 'any',
        price: 100,
        name: 'any',
      },
    ]);

    expect(discountedPrice.price).toMatchObject({
      original: 100,
      final: 100,
      currency: 'EUR',
      discount_percentage: null,
    });
  });
});
