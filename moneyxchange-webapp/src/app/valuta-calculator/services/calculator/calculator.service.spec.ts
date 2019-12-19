import { Observable, of } from 'rxjs';

import { CalculatorService } from './calculator.service';
import { RatesService } from '../../../shared/services/rates';
import { Valuta, AVAILABLE_VALUTAS } from '../../../shared/models';
import { Rate } from '../../../shared/models/remote';

class RatesServiceMock extends RatesService {
  constructor() {
    super(null, null);
  }

  ratesFor(source: Valuta, targets: Valuta[]): Observable<Rate> {
    return of({
      base: 'USD',
      date: '2018-07-23',
      rates: { EUR: 1.5 }
    });
  }
}

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;
  let ratesService: RatesService;

  beforeEach(() => {
    ratesService = new RatesServiceMock();
    calculatorService = new CalculatorService(ratesService);
  });

  it('should calculate converted value as the input value multiplied per the obtained rate', () => {
    calculatorService
      .calculateValue(AVAILABLE_VALUTAS.USD, AVAILABLE_VALUTAS.EUR, 100)
      .subscribe(convertedValue => {
        expect(convertedValue).toBe(150);
      });
  });
});
