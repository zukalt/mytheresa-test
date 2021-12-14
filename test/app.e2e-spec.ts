import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ProductDiscounted } from '../src/products/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body.length).toBe(5);
  });

  it('/products?category=sneakers', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .query({ category: 'sneakers' })
      .expect(200);

    const body: ProductDiscounted[] = response.body;
    expect(body.length).toBe(1);
    expect(body[0]).toMatchObject({
      sku: '000005',
      name: 'Nathane leather sneakers',
      category: 'sneakers',
      price: {
        original: 59000,
        final: 59000,
        currency: 'EUR',
        discount_percentage: null,
      },
    });
  });

  it('/products?category=boots', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .query({ category: 'boots' })
      .expect(200);

    const body: ProductDiscounted[] = response.body;
    expect(body.length).toBe(5);
    body.forEach((product) => {
      expect(product).toEqual(
        expect.objectContaining({
          sku: expect.stringMatching(/\d+/),
          name: expect.any(String),
          category: 'boots',
          price: expect.objectContaining({
            original: expect.any(Number),
            final: expect.any(Number),
            currency: 'EUR',
            discount_percentage: '30%',
          }),
        }),
      );
      expect(product.price.final).toBe(
        Math.round(product.price.original * 0.7),
      );
    });
  });

  it('/products?category=boots&priceLessThan=59000', async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .query({ category: 'boots', priceLessThan: '59000' })
      .expect(200);

    const body: ProductDiscounted[] = response.body;
    expect(body.length).toBe(3);
    body.forEach((product) => {
      expect(product.price.original).toBeLessThanOrEqual(59000);
      expect.objectContaining({
        category: 'boots',
        price: expect.objectContaining({
          original: 59000,
          final: expect.any(Number),
          currency: 'EUR',
          discount_percentage: '30%',
        }),
      });
    });
  });
});
