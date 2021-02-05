import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthManagementService } from '../auth/auth-management.service';


@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  private authManagementService: AuthManagementService;
  constructor( private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    this.authManagementService = this.injector.get(AuthManagementService);
    const currentUser = this.authManagementService.currentUserValue;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }

    return next.handle(request);
  }
}
