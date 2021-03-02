import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalCacheService } from '../../../core/load-cache/load-cache.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient, public cache: LocalCacheService) { }

  public getUsers(): Observable<any> {
    let header = new HttpHeaders().set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNjAzOGYzODZhYmIxYzMwMDE1YzYyZWQwIiwiaWF0IjoxNjE0NzA1NjI2LCJleHAiOjE2MTQ3NDg4MjZ9.OvRl5HDbKKNrL2b9Zr8HI7ODkZZh97uq55-Idoi0TVU');

    //Cache an observable
    let requestObservable = this.http.get<any>(`${environment.apiUrl}/users`, { headers: header });

    return this.cache.observable('my-cache-key', requestObservable, 300);

    // return this.http.get<any>(`${environment.apiUrl}/users`, { headers: header });

  }

}
