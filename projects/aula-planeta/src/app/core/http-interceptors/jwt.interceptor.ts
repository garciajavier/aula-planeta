import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthManagementService } from '../auth/auth-management.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  private authManagementService: AuthManagementService;
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.authManagementService = this.injector.get(AuthManagementService);
    const currentUser = this.authManagementService.currentUser;

    const isLoggedIn = currentUser && currentUser.jwtToken;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${currentUser.jwtToken}` }
      });
    }

    return next.handle(request);
  }
}
