import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';

import { RatesService } from "./rates.service";
import { RatesCache } from './rates.cache';
import { LocalStorageService, StorageService } from '../storage';
import { AVAILABLE_VALUTAS } from '../../models';
import { Rate } from '../../models/remote';

describe('RatesService', () => {
  let ratesService: RatesService;
  let ratesCache: RatesCache;
  let storage: StorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: StorageService, useClass: LocalStorageService },
        RatesCache
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    storage = TestBed.get(StorageService);
    ratesCache = TestBed.get(RatesCache);
    ratesService = TestBed.get(RatesService);
  });

  afterEach(() => {
    storage.removeItem('S:USD->T:EUR');
    storage.removeItem('S:EUR->T:USD');
  });

  it('should return cached value when cache has the requested rate data', () => {
    const cachedRate: Rate = {
      base: 'USD',
      date: '2018-07-23',
      rates: { EUR: 0.998 }
    };
    ratesCache.save(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.EUR], cachedRate);

    ratesService.ratesFor(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.EUR])
      .subscribe(rate => expect(rate).toEqual(cachedRate));

    httpTestingController.expectNone(`${environment.api}rates?base=USD&symbols=EUR`);
  });

  it('should send GET http request to get rates when no matching rate is found on cache', () => {
    const cachedRate: Rate = {
      base: 'EUR',
      date: '2018-07-23',
      rates: { USD: 1.002004008016032 }
    };
    ratesCache.save(AVAILABLE_VALUTAS.EUR, [AVAILABLE_VALUTAS.USD], cachedRate);

    const httpRate: Rate = {
      base: 'USD',
      date: '2018-07-23',
      rates: { EUR: 0.998 }
    };

    ratesService.ratesFor(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.EUR])
      .subscribe(rate => expect(rate).toEqual(httpRate));

    const testRequest: TestRequest = httpTestingController.expectOne(`${environment.api}rates?base=USD&symbols=EUR`);
    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(httpRate);

    httpTestingController.verify();
  });
});
