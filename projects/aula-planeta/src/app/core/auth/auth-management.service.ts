import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Role } from '../../shared/models/role.model';
import { AuthDataService } from './auth-data.service';
import { map } from 'rxjs/operators';

import { SocialAuthService } from 'angularx-social-login';
import { MicrosoftLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';


export const AUTH_KEY = 'AUTH';
export const JWT = 'JWT';
export const CURRENT_USER = 'CURRENT_USER';
export const BACKUP_USER = 'BACKUP_USER';
export const ROLES = 'ROLES';

export interface AuthState {
  isAuthenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthManagementService implements OnDestroy {
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

  private destroy$: Subject<void> = new Subject<void>();


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private localStorageService: LocalStorageService,
    private authDataService: AuthDataService
  ) {
    this.localStorageService.getItem(CURRENT_USER).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUserNext(currentUser);
        this.isAuthenticatedNext(true);
      });

    this.localStorageService.getItem(ROLES).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(roles => {
        this.roles =
          roles && roles.length > 0
            ? roles
            : [
              {
                _id: '6038f369abb1c30015c62ece',
                desc: 'Alumno',
                name: 'ALUMNO_ROLE'
              },
              {
                _id: '603f54851225b56b007d726b',
                desc: 'Profesor',
                name: 'PROFESOR_ROLE'
              }
            ];
      });

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
  register(user: User) {
    return this.authDataService.register(user).pipe(
      map((data) => {
        this.localStorageService.setItem(JWT, data.token).pipe(
          take(1),
          takeUntil(this.destroy$)).subscribe();
        return data.user;

      })
    );
  }


  /**
   * Login
   */
  authLogin(email: string, password: string) {
    return this.authDataService.authenticate(email, password).pipe(
      map((data) => {
        this.localStorageService.setItem(JWT, data.token).pipe(
          take(1),
          takeUntil(this.destroy$)).subscribe();
        this.localStorageService.setItem(BACKUP_USER, data.user).pipe(
          take(1),
          takeUntil(this.destroy$)).subscribe();
        this.currentUserNext(data.user);
        this.isAuthenticatedNext(true);
        // this.startRefreshTokenTimer();
      })
    );
  }
  /**
   * Login
   */
  authLoginOffline() {
    this.localStorageService.getItem(BACKUP_USER).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe(backupUser => {
        this.currentUserNext(backupUser);
        this.isAuthenticatedNext(true);
      });
    // this.startRefreshTokenTimer();
    return of('');
  }

  /**
   * LoginGoogleUser
   */
  authLoginGoogle(tokenGoogle: string) {
    return this.authDataService.authenticateGoogle(tokenGoogle).pipe(
      map((data) => {
        this.isAuthenticatedNext(true);
        this.localStorageService.setItem(JWT, data.token).pipe(
          take(1),
          takeUntil(this.destroy$)).subscribe();
        this.localStorageService.setItem(BACKUP_USER, data.user).pipe(
          take(1),
          takeUntil(this.destroy$)).subscribe();
        this.currentUserNext(data.user);
        // this.startRefreshTokenTimer();
      })
    );
  }

  /**
   * Logout
   */
  authLogout() {
    this.currentUserNext(null);
    this.isAuthenticatedNext(false);
    this.stopRefreshTokenTimer();
    // this.authDataService.logout().pipe(
    // take(1),
    // takeUntil(this.destroy$)).subscribe();
  }

  refreshToken() {
    return this.authDataService.refreshToken().pipe(
      map((user) => {
        this.currentUserNext(user);
        // this.startRefreshTokenTimer();
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
      // return this.currentUser.role = role;
      return this.currentUser.role.some((currentRole) => {
        return currentRole.name === role;
      });
    });
  }

  /**
   * getter isAuthenticated
   */
  public get isAuthenticated() {
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
    this.localStorageService.setItem(ROLES, roles).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe();
  }

  /**
   * Emit a isAuthenticated
   * @param isAuthenticated
   */
  private isAuthenticatedNext(isAuthenticated: boolean) {
    this._isAuthenticated.next(isAuthenticated);
    this.localStorageService.setItem(AUTH_KEY, { isAuthenticated }).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe();
  }

  /**
   * Emit a user
   * @param user
   */
  private currentUserNext(user: User) {
    this._currentUser.next(user);
    this.localStorageService.setItem(CURRENT_USER, user).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe();
  }

  private refreshTokenTimeout;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    let jwtToken;
    this.localStorageService.getItem(JWT).subscribe(jwt => {
      jwtToken = JSON.parse(atob(jwt.split('.')[1]));
    });

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().pipe(
      takeUntil(this.destroy$)).subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
