import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressSpinnerService } from '../../shared/progress-spinner/progress-spinner.service';

const NO_SPINNER_LOADING_HEADER = 'NO_LOADER';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor {

  activeRequests: number = 0;

    constructor(
        private progressSpinnerService: ProgressSpinnerService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.activeRequests === 0 && request.headers.has(NO_SPINNER_LOADING_HEADER)) {
          this.progressSpinnerService.spin$.next(true);
        }

        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                  this.progressSpinnerService.spin$.next(false);
                }
            })
        )
    };
}