import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => service = new LocalStorageService());

  it('should save an item in the local storage', () => {
    service.setItem('test-key', JSON.stringify({ data: 'test-value' }));

    const localStorageValue: string = localStorage.getItem('test-key');

    expect(localStorageValue).toBeTruthy();
    expect(JSON.parse(localStorageValue).data).toBe('test-value');
  });

  it('should get an item from the local storage', () => {
    service.setItem('test-key', JSON.stringify({ data: 'test-value' }));

    const localStorageValue: string = localStorage.getItem('test-key');
    const storageValue: string = service.getItem('test-key');

    expect(storageValue).toBeTruthy();
    expect(storageValue).toBe(localStorageValue);
  });

  it('should remove an item from the local storage', () => {
    service.setItem('test-key', JSON.stringify({ data: 'test-value' }));
    let localStorageValue: string = localStorage.getItem('test-key');
    expect(localStorageValue).toBeTruthy();

    service.removeItem('test-key');

    localStorageValue = localStorage.getItem('test-key');
    expect(localStorageValue).toBeFalsy();
  });
});
