import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthManagementService } from '../auth/auth-management.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { mergeMap, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  private authManagementService: AuthManagementService;
  private localStorageService: LocalStorageService;
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.localStorageService = this.injector.get(LocalStorageService);
    this.authManagementService = this.injector.get(AuthManagementService);
    const currentUser = this.authManagementService.currentUser;
    const isAuthenticated = this.authManagementService.isAuthenticated;

    const isLoggedIn = currentUser && isAuthenticated;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    // add authorization header with jwt token if available
    return this.localStorageService.getItem('JWT').pipe(
      switchMap(jwt => {
        if (isLoggedIn && isApiUrl) {
          const request = req.clone({
            setHeaders: {
              'x-token': `${jwt}`,
            }
          });
          return next.handle(request);
        }
        return next.handle(req);
      })

    )
  }
}
