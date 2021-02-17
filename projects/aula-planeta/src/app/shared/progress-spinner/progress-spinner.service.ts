import { Injectable } from '@angular/core';

//cdk
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

//rxjs
import { Observable, Subject } from 'rxjs'
import { mapTo, scan, map, mergeMap } from 'rxjs/operators'

import { ProgressSpinnerComponent } from './progress-spinner.component';

@Injectable({
    providedIn: 'root',
})
export class ProgressSpinnerService {

    private spinnerTopRef = this.cdkSpinnerCreate();

    spin$:Subject<Boolean> = new Subject()

    constructor (private overlay: Overlay) {
      this.spin$
        .asObservable()
        .pipe(
          map(val => val ? true : false ),
        )
        .subscribe(res => {
            if (res && !this.spinnerTopRef.hasAttached()) {
              this.showSpinner()
            } else if ( !res && this.spinnerTopRef.hasAttached()) {
              this.stopSpinner();
            }
          }
        )
    }

    private cdkSpinnerCreate () {
      return this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        positionStrategy: this.overlay.position()
          .global()
          .centerHorizontally()
          .centerVertically()
      })
    }

    private showSpinner () {
      this.spinnerTopRef.attach(new ComponentPortal(ProgressSpinnerComponent))
    }

    private stopSpinner () {
      this.spinnerTopRef.detach() ;
    }
}