export abstract class StorageService {
  abstract setItem(key: string, value: string): void;
  abstract getItem(key: string): string;
  abstract removeItem(key: string): void;
}
