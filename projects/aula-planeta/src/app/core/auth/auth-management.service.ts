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
  public currentUserValue: User;

  /**
   * Contains the isAuthenticated 
   */
  private _roles: BehaviorSubject<Role[]> = new BehaviorSubject(null);
  public roles$ = this._roles.asObservable();

  constructor(private localStorageService: LocalStorageService, private authDataService: AuthDataService) {
    const currentUser: User = this.localStorageService.getItem(CURRENT_USER);
    this.currentUser = currentUser;

    const roles: Role[] = this.localStorageService.getItem(ROLES);
    this.roles =
      (roles && roles.length > 0)
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
   * getter isAuthenticated
   */
  private get isAuthenticated() {
    return this._isAuthenticated.getValue();
  }

  /**
   * getter currentUser
   */
  private get currentUser() {
    return this._currentUser.getValue();
  }

  /**
   * getter roles
   */
  private get roles() {
    return this._roles.getValue();
  }

  /**
   * Login
   */
  authLogin(username: string, password: string) {
    return this.authDataService.authenticate(username, password).pipe(
      map((user) => {
        this.currentUser = user;
        this.isAuthenticated = true;
      })
    );
  }

  /**
   * Logout
   */
  authLogout() {
    this.currentUser = null;
    this.roles = null;
    this.isAuthenticated = false;
  }

  /**
   * Register
   */
  register(user: User): Observable<User> {
    return this.authDataService.register(user);
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
  private set currentUser(user: User) {
    this._currentUser.next(user);
    this.currentUserValue = this._currentUser.getValue();
    this.localStorageService.setItem(CURRENT_USER, user);
  }

  /**
   * Emit a roles
   * @param roles
   */
  private set roles(roles: Role[]) {
    this._roles.next(roles);
    this.localStorageService.setItem(ROLES, roles);
  }
}
