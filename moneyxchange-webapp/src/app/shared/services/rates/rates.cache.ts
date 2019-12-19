import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { StorageService } from '../storage';
import { Valuta, CacheItem } from '../../models';
import { Rate } from '../../models/remote';

@Injectable({
  providedIn: 'root'
})
export class RatesCache {

  private readonly ttl: number = environment.cache.rates.ttl * 60 * 1000;

  constructor(private storage: StorageService) { }
  
  save(source: Valuta, targets: Valuta[], rate: Rate): void {
    const cacheKey: string = this.buildCacheKey(source, targets);
    const cacheItem: CacheItem<Rate> = CacheItem.of(rate);
    this.storage.setItem(cacheKey, JSON.stringify(cacheItem));
  }

  get(source: Valuta, targets: Valuta[]): Rate {
    const cacheKey: string = this.buildCacheKey(source, targets);
    const cacheValue: string = this.storage.getItem(cacheKey);
    if (cacheValue && this.cacheHasNotExpired(cacheValue)) {
      const cacheItem: CacheItem<Rate> = JSON.parse(cacheValue);
      return cacheItem.item;
    } else {
      this.invalidateCacheItem(cacheKey);
    }
  }

  private buildCacheKey(source: Valuta, targets: Valuta[]): string {
    const sourcePart: string = 'S:' + source.name;
    const targetPart: string = 'T:' + targets
      .map(target => target.name)
      .reduce((accumulator, target) => accumulator + ',' + target);
    return sourcePart + '->' + targetPart;
  }

  private cacheHasNotExpired(cacheValue: string): boolean {
    const cacheItem: CacheItem<Rate> = JSON.parse(cacheValue);
    const cacheDate: Date = new Date(cacheItem.date);
    const cacheItemIsValid: boolean = new Date().getTime() <= cacheDate.getTime() + this.ttl;
    return cacheItemIsValid;
  }

  private invalidateCacheItem(cacheKey: string): void {
    this.storage.removeItem(cacheKey);
  }

}
