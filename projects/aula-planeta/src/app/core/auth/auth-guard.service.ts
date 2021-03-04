import { forwardRef, Inject, Injectable, Injector } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthManagementService } from './auth-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from '../title/title.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private authManagementService: AuthManagementService;
  private titleService: TitleService;
  private translateService: TranslateService;
  constructor(private injector: Injector, private router: Router, private snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.authManagementService = this.injector.get(AuthManagementService);
    this.titleService = this.injector.get(TitleService);
    this.translateService = this.injector.get(TranslateService);
    if (this.authManagementService.currentUser) {
      if (route.data.role && !this.authManagementService.userCan(route.data.role)) {
        this.snackBar.open('No tienes privilegios', 'OK', {
          duration: 2000
        });
        return false;
      }
      console.log(this.router.routerState.snapshot.root);
      console.log(this.router);

      this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService);
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }
}
