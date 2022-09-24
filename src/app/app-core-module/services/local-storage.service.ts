import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {
    if (typeof Storage !== 'undefined') {
      // Code for localStorage/sessionStorage.
    } else {
      console.log('Sorry! No Web Storage support..');
    }
  }

  public get(key: string) {
    try {
      const storage = JSON.parse(localStorage.getItem(key) || '{}');
      return storage;
    } catch (e) {
      console.log(e);
      return {};
    }
  }

  public set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  }

  public remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  }
}
