import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
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
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routeAnimations ]
})
export class AppComponent implements OnInit {
  public showOverlay = true;
  constructor(public settingsService: SettingsService, private translateService: TranslateService, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  private static isIEorEdgeOrSafari() {
    console.log('browser name:', browser().name);
    return [ 'ie', 'edge', 'safari' ].includes(browser().name);
  }

  ngOnInit(): void {
    this.translateService.use('es');
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.settingsService.changeSetting('pageAnimationsDisabled', true);
    }
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
