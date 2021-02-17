import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
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

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.has(NO_SPINNER_LOADING_HEADER) ) {
          req = this.clearNoSpinnerHeader(req);
          return next.handle(req);
        } else {
          this.activeRequests++;
          this.progressSpinnerService.spin$.next(true);

          return next.handle(req).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                  this.progressSpinnerService.spin$.next(false);
                }
            })
        )
        }
    }

  /**
   * Iterate over httpHeaders from request and delete the NO_LOADER header
   * @param req Request to analize
   */
  private clearNoSpinnerHeader(req: HttpRequest<any>): HttpRequest<any> {
    let cloneHttpHeaders: HttpHeaders = new HttpHeaders();
    req.headers.keys().forEach((key: string) => {
      if (key !== NO_SPINNER_LOADING_HEADER) {
        cloneHttpHeaders = cloneHttpHeaders.append(key, req.headers.get(key));
      }
    });
    const reqMod = req.clone({
      headers: cloneHttpHeaders
    });
    return reqMod;
  }
}