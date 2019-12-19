import { CurrencyMaskService } from './currency-mask.service';

describe('CurrencyMaskService', () => {
  let currencyMaskService: CurrencyMaskService;

  beforeEach(() => currencyMaskService = new CurrencyMaskService());

  it('should unmask value with one thousands separator', () => {
    expect(currencyMaskService.unmask('$5,000')).toBe(5000);
  });

  it('should unmask value with more than one thousands separator', () => {
    expect(currencyMaskService.unmask('$5,000,000')).toBe(5000000);
  });

  it('should unmask value with decimal separator', () => {
    expect(currencyMaskService.unmask('$5,000.99')).toBe(5000.99);
  });

  it('should unmask value with custom thousands separator', () => {
    expect(currencyMaskService.unmask('$5x000x000', 'x')).toBe(5000000);
  });

  it('should unmask value with more than one size valute symbol', () => {
    expect(currencyMaskService.unmask('COP 5,000.99')).toBe(5000.99);
  });
});
