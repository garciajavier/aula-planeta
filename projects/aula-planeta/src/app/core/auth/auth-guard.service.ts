import { forwardRef, Inject, Injectable, Injector } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthManagementService } from './auth-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private authManagementService: AuthManagementService;
  constructor(private injector: Injector, private router: Router, private snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authManagementService = this.injector.get(AuthManagementService);
    if (this.authManagementService.currentUserValue) {
      if (route.data.roles && !this.authManagementService.userCan(route.data.roles)) {
        this.snackBar.open('No tienes privilegios', 'OK', {
          duration: 2000
        });
        return false;
      }
      return true;
    }



    // not logged in so redirect to login page with the return url
    this.router.navigate([ '/login' ], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
