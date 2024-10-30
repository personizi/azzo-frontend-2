import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  set(key: string, value: unknown): boolean {
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  get<T>(key: string): T {
    const item = localStorage.getItem(key);
    if (item === null) {
      throw new Error(`No item found in localStorage with key: ${key}`);
    }
    return JSON.parse(item) as T;
  }

  remove(key: string): boolean {
    localStorage.removeItem(key);

    return true;
  }

  clear(): boolean {
    localStorage.clear();

    return true;
  }
}
