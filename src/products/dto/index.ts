import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PriceInfo {
  @ApiProperty({ description: 'Original Price', example: '30000' })
  readonly original: number;
  @ApiProperty({ description: 'Final Price', example: '27000' })
  readonly final: number;
  @ApiProperty({ description: 'Applied discount', example: '10%' })
  readonly discount_percentage: string | null;
  @ApiProperty({ description: 'Currency', example: 'EUR' })
  readonly currency: 'EUR';
}

export class ProductDiscounted {
  @ApiProperty({ description: 'Product SKU', example: '000001' })
  readonly sku: string;

  @ApiProperty({
    description: 'Product name',
    example: 'BV Lean leather ankle boots',
  })
  readonly name: string;

  @ApiProperty({ description: 'Product Category', example: 'boots' })
  readonly category: string;
  @ApiProperty({ description: 'price information' })
  readonly price: PriceInfo;
}

export class SearchQueryInput {
  @ApiPropertyOptional({ description: 'Product category', example: 'boots' })
  category?: string;
  @ApiPropertyOptional({
    description: 'Max price in cents (less than)',
    example: '10000',
  })
  priceLessThan?: string;
}
