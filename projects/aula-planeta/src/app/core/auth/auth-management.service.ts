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
  private isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const {isAuthenticated} = this.localStorageService.getItem(AUTH_KEY);
    this.isAuthenticatedNext(isAuthenticated);
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
    this.isAuthenticated.next(isAuthenticated);
    this.localStorageService.setItem(AUTH_KEY, { isAuthenticated });
  }
}
