import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker'
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

import { routeAnimations, LocalStorageService } from './core/core.module';

@Component({
  selector: 'aula-planeta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  /**
   * Use to destroy and prevent memory leaks
   */
  private destroy$: Subject<void> = new Subject<void>();
  public showOverlay = true;
  
  constructor(public settingsService: SettingsService, private translateService: TranslateService, private router: Router, private swUpdate: SwUpdate) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  private static isIEorEdgeOrSafari() {
    console.log('browser name:', browser().name);
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {

    if (this.swUpdate.isEnabled) {

      this.swUpdate.available
        .pipe(take(1), takeUntil(this.destroy$))
        .subscribe(() => {
          if (confirm("Nueva versión disponible de AulaPlaneta. ¿Desea actulizarla?")) {
            window.location.reload();
          }
        });
    }
    this.translateService.use('es');
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.settingsService.changeSetting('pageAnimationsDisabled', true);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }
}
