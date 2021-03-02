import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { NgForage, Driver, NgForageCache, CachedItem } from 'ngforage';

const APP_PREFIX = 'aula-planeta-';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(private readonly ngf: NgForage, private readonly cache: NgForageCache) { }

  public setItem<T>(key: string, value: T): Observable<T> {
    return from(this.ngf.setItem(`${APP_PREFIX}${key}`, value))
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public getItem(key: string): Observable<any> {
    return from(this.ngf.getItem(`${APP_PREFIX}${key}`))
  }

  /**
   *
   * @param key
   * @returns {any}
   */
  public removeItem(key: string): Observable<void> {
    return from(this.ngf.removeItem(`${APP_PREFIX}${key}`))
  }
}
