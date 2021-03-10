import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalCacheService } from '../../../core/load-cache/load-cache.service';
import { map } from 'rxjs/operators';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient, public cache: LocalCacheService) { }

  public getUsers(): Observable<any> {
    let requestObservable = this.http.get<any>(`${environment.apiUrl}/users`);
    return this.cache.observable('USERDATASERVICE-GETUSERS', requestObservable);
  }

  public createUser(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, user);
  }
  public updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/users/${user.uuid}`, user);
  }
  public deleteUser(user: User): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/users/${user.uuid}`);
  }
  public uploadImgUser(user: User, imagen: any): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', imagen);
    return this.http.put<any>(`${environment.apiUrl}/upload/user/${user.uuid}`, formData);
  }

}
