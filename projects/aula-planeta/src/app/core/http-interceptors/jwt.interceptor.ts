import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthManagementService } from '../auth/auth-management.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

  private jwt;

  private authManagementService: AuthManagementService;
  private localStorageService: LocalStorageService;
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.localStorageService = this.injector.get(LocalStorageService);
    this.authManagementService = this.injector.get(AuthManagementService);


    this.localStorageService.getItem('JWT').subscribe(jwt => {
      // add authorization header with jwt token if available
      const currentUser = this.authManagementService.currentUser;
      const isAuthenticated = this.authManagementService.isAuthenticated;

      const isLoggedIn = currentUser && isAuthenticated;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      // if (isLoggedIn && isApiUrl) {
      // if (isApiUrl) {
      // request = request.clone({
      //   headers: request.headers.set('x-token', `${jwt}`)
      // });
      // request = request.clone();
      // request.headers.set('x-token', `${jwt}`);
      // }
    })

    return next.handle(request);
  }
}
