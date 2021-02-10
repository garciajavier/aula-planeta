import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { SwUpdate } from '@angular/service-worker'

import { routeAnimations, LocalStorageService } from './core/core.module';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
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

  constructor(public settingsService: SettingsService, private translateService: TranslateService, private swUpdate: SwUpdate) { }

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
}
