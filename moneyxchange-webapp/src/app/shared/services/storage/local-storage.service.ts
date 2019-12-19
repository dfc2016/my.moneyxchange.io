import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class LocalStorageService extends StorageService {
  
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

}
