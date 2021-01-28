import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../environments/environment';
import { AuthManagementService } from './core/auth/auth-management.service';
import { SettingsService } from './core/settings/settings.service';
import { Settings } from './shared/models/settings.model';
import { TranslateService } from '@ngx-translate/core';

import {
  routeAnimations,
  LocalStorageService
} from './core/core.module';
@Component({
  selector: 'aula-planeta-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routeAnimations ]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png').default;
  languages = [ 'en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he' ];
  navigation = [ { link: 'examples', label: 'aula-planeta.menu.examples' } ];
  navigationSideMenu = [ ...this.navigation, { link: 'settings', label: 'aula-planeta.menu.settings' } ];

  settings$: Observable<Settings>;

  constructor(
    public authManagementService: AuthManagementService,
    public settingsService: SettingsService,
    private storageService: LocalStorageService,
    private translateService: TranslateService
  ) {}

  private static isIEorEdgeOrSafari() {
    console.log('browser name:', browser().name);
    return [ 'ie', 'edge', 'safari' ].includes(browser().name);
  }

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    this.translateService.use('es');
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.settingsService.changeSetting('pageAnimationsDisabled', true);
    }
  }

  onLoginClick() {
    this.authManagementService.authLogin();
  }

  onLogoutClick() {
    this.authManagementService.authLogout();
  }

  onLanguageSelect({ value: language }) {
    this.settingsService.changeSetting('language', language);
  }
}
