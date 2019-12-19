import { Injectable } from '@angular/core';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { CurrencyMaskOptions } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CurrencyMaskService {
  private readonly defaultCurrencyOptions: CurrencyMaskOptions = {
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 4,
    integerLimit: null,
    requireDecimal: false,
    allowNegative: false,
    allowLeadingZeroes: false
  };

  createMask(options: CurrencyMaskOptions): any {
    return createNumberMask({
      ...this.defaultCurrencyOptions,
      ...options
    });
  }

  unmask(value: string, thousandsSeparatorSymbol: string = this.defaultCurrencyOptions.thousandsSeparatorSymbol): number {
    const match: any = value.match(/\d/);
    if (!match || !match.index) {
      return 0;
    }
    return Number(value.substr(match.index).replace(new RegExp(thousandsSeparatorSymbol, 'g'), ''));
  }
}
