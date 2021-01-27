import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
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
