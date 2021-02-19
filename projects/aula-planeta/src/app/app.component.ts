import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SettingsService } from './core/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { routeAnimations } from './core/core.module';

@Component({
  selector: 'aula-planeta-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routeAnimations ]
})
export class AppComponent implements OnInit {
  constructor(public settingsService: SettingsService, private translateService: TranslateService) {}

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
}
