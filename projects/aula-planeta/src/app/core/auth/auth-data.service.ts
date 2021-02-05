import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {

  constructor(private http: HttpClient) {}

  public authenticate(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.api_url}/users/authenticate`, { username, password })
  }

    /**
   * Get user
   * @param User User to register
   */
  public register(user: User): Observable<User> {
    return this.http.post<any>(`${environment.api_url}/users/register`, user);
  }
}
