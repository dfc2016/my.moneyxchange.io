import { RatesCache } from './rates.cache';
import { StorageService, LocalStorageService } from '../storage';
import { AVAILABLE_VALUTAS } from '../../models';
import { Rate } from '../../models/remote';

describe('RatesCache', () => {
  let cache: RatesCache;
  let storage: StorageService;

  beforeEach(() => {
    storage = new LocalStorageService();
    cache = new RatesCache(storage);
  });

  it('should return undefined when no item is found in cache', () => {
    const cachedValue: Rate = cache.get(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.USD]);

    expect(cachedValue).toBeUndefined();
  });

  it('should save and return value in cache', () => {
    const rate: Rate = {
      base: 'USD',
      date: '2018-07-23',
      rates: {
        EUR: 0.998
      }
    };
    cache.save(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.EUR], rate);

    const cachedValue: Rate = cache.get(AVAILABLE_VALUTAS.USD, [AVAILABLE_VALUTAS.EUR]);

    expect(cachedValue).toEqual(rate);
  });
});
