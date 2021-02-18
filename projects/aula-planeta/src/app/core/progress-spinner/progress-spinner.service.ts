import { Injectable, OnDestroy, Injector, OnInit } from '@angular/core';

//cdk
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

//rxjs
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ProgressSpinnerComponent } from './progress-spinner.component';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService implements OnDestroy {
  private overlay: Overlay;
  private router: Router;
  public spin$: Subject<Boolean> = new Subject();

  /**
   * Use to destroy and prevent memory leaks
   */
  private destroy$: Subject<void> = new Subject<void>();
  private spinnerTopRef;

  constructor(private injector: Injector) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public initProgressSpinnerService() {
    this.overlay = this.injector.get(Overlay);
    this.spinnerTopRef = this.cdkSpinnerCreate();

    this.spin$.asObservable().pipe(map((val) => (val ? true : false))).subscribe((res) => {
      if (res && !this.spinnerTopRef.hasAttached()) {
        this.showSpinner();
      } else if (!res && this.spinnerTopRef.hasAttached()) {
        this.stopSpinner();
      }
    });

    if (this.router) {
      this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
        this.navigationInterceptor(event);
      });
    }
  }

  // Shows and hides the loading spinner during RouterEvent changes
  public navigationInterceptor(event): void {
    if (event instanceof NavigationStart) {
      this.spin$.next(true);
    }

    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.spin$.next(false);
    }
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });
  }

  private showSpinner() {
    this.spinnerTopRef.attach(new ComponentPortal(ProgressSpinnerComponent));
  }

  private stopSpinner() {
    this.spinnerTopRef.detach();
  }
}
