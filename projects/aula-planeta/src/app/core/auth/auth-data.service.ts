import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  constructor(private http: HttpClient) { }

  public authenticate(email: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/login`, { email, password });
  }

  public authenticateGoogle(tokenGoogle: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login/google`, { token: tokenGoogle });
  }

  public logout(): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/login/revoke`, {}, { withCredentials: true });
  }

  public refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/login/refresh`, {}, { withCredentials: true });
  }

  /**
   * Get user
   * @param User User to register
   */
  public register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users/register`, user);
  }
}
