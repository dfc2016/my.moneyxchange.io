export class CacheItem<T> {
  date: Date;
  item: T;

  static of(item: any): CacheItem<any> {
    return {
      date: new Date(),
      item
    };
  }
}
