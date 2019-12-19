import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

import { Valuta } from '../../models';
import { Rate } from '../../models/remote';
import { RatesCache } from './rates.cache';

@Injectable({
  providedIn: 'root'
})
export class RatesService {

  constructor(private http: HttpClient, private cache: RatesCache) { }

  ratesFor(source: Valuta, targets: Valuta[]): Observable<Rate> {
    const cachedRate: Rate = this.cache.get(source, targets);
    if (cachedRate) {
      return of(cachedRate);
    }

    return this.http.get(environment.api + 'rates', { params: this.buildHttpParams(source, targets) })
      .pipe(
        tap((rate: Rate) => this.cache.save(source, targets, rate))
      );
  }

  private buildHttpParams(source: Valuta, targets: Valuta[]): HttpParams {
    const symbols: string = targets
      .map(target => target.name)
      .reduce((accumulator, target) => accumulator + ',' + target);
    return new HttpParams()
      .append('base', source.name)
      .append('symbols', symbols);
  }

}
