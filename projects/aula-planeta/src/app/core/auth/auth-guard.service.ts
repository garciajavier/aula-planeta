import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../core.state';
import { AuthManagementService } from './auth-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authManagementService: AuthManagementService) {}

  canActivate(): Observable<boolean> {
    return this.authManagementService.isAuthenticated$;
  }
}
