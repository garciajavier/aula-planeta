import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Role } from '../../shared/models/role.model';
import { AuthDataService } from './auth-data.service';
import { map } from 'rxjs/operators';

export const AUTH_KEY = 'AUTH';
export const CURRENT_USER = 'CURRENT_USER';
export const ROLES = 'ROLES';

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

  /**
   * Contains the isAuthenticated 
   */
  private _currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  public currentUser$ = this._currentUser.asObservable();

  /**
   * Contains the isAuthenticated 
   */
  private _roles: BehaviorSubject<Role[]> = new BehaviorSubject(null);
  public roles$ = this._roles.asObservable();

  constructor(private localStorageService: LocalStorageService, private authDataService: AuthDataService) {
    const currentUser: User = this.localStorageService.getItem(CURRENT_USER);
    this.currentUserNext(currentUser);

    const roles: Role[] = this.localStorageService.getItem(ROLES);
    this.roles =
      roles && roles.length > 0
        ? roles
        : [
            {
              id: 0,
              description: 'Alumno',
              code: 'ALUMNO'
            },
            {
              id: 1,
              description: 'Profesor',
              code: 'PROFESOR'
            }
          ];
  }

  /**
   * getter currentUser
   */
  get currentUser() {
    return this._currentUser.getValue();
  }

  /**
   * Register
   */
  register(user: User): Observable<User> {
    return this.authDataService.register(user);
  }

  /**
   * Login
   */
  authLogin(username: string, password: string) {
    return this.authDataService.authenticate(username, password).pipe(
      map((user) => {
        this.currentUserNext(user);
        this.isAuthenticated = true;
        this.startRefreshTokenTimer();
      })
    );
  }

  /**
   * Logout
   */
  authLogout() {
    this.currentUserNext(null);
    this.isAuthenticated = false;
    this.stopRefreshTokenTimer();
    return this.authDataService.logout();
  }

  refreshToken() {
    return this.authDataService.refreshToken().pipe(
      map((user) => {
        this.currentUserNext(user);
        this.startRefreshTokenTimer();
        return user;
      })
    );
  }

  /**
   * Check if user has roles
   * @param hasRoles 
   */
  userCan(hasRoles: string[]): boolean {
    return hasRoles.some((role) => {
      return this.currentUser.roles.some((currentRole) => {
        return currentRole.code === role;
      });
    });
  }

  /**
   * getter isAuthenticated
   */
  private get isAuthenticated() {
    return this._isAuthenticated.getValue();
  }

  /**
   * getter roles
   */
  private get roles() {
    return this._roles.getValue();
  }

  /**
   * Emit a roles
   * @param roles
   */
  private set roles(roles: Role[]) {
    this._roles.next(roles);
    this.localStorageService.setItem(ROLES, roles);
  }

  /**
   * Emit a isAuthenticated
   * @param isAuthenticated
   */
  private set isAuthenticated(isAuthenticated: boolean) {
    this._isAuthenticated.next(isAuthenticated);
    this.localStorageService.setItem(AUTH_KEY, { isAuthenticated });
  }

  /**
   * Emit a user
   * @param user
   */
  private currentUserNext(user: User) {
    this._currentUser.next(user);
    this.localStorageService.setItem(CURRENT_USER, user);
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(this.currentUser.jwtToken.split('.')[1]));

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
