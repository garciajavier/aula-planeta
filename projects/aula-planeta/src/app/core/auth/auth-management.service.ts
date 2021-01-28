import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../local-storage/local-storage.service';

export const AUTH_KEY = 'AUTH';

export interface AuthState {
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService {
  /**
   * Contains the isAuthenticated 
   */
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const auth = this.localStorageService.getItem(AUTH_KEY);
    this.isAuthenticatedNext(auth ? auth.isAuthenticated : false);
  }

  /**
   * Login
   */
  authLogin() {
    this.isAuthenticatedNext(true);
  }
  
  /**
   * Logout
   */
  authLogout() {
    this.isAuthenticatedNext(false);
  }
  
  /**
   * Emit a isAuthenticated
   * @param isAuthenticated
   */
  private isAuthenticatedNext(isAuthenticated: boolean) {
    this._isAuthenticated.next(isAuthenticated);
    this.localStorageService.setItem(AUTH_KEY, { isAuthenticated });
  }
}
