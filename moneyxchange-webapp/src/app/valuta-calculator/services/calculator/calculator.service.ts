import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RatesService } from '../../../shared/services/rates';
import { Valuta } from '../../../shared/models';

@Injectable()
export class CalculatorService {

  constructor(private ratesService: RatesService) { }

  calculateValue(source: Valuta, target: Valuta, value: number): Observable<number> {
    return this.ratesService.ratesFor(source, [target]).pipe(
      map(rate => rate.rates[target.name] * value)
    );
  }
}
