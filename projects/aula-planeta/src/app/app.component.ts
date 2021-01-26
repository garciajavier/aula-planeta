import browser from 'browser-detect';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../environments/environment';
import { AuthManagementService } from './core/auth/auth-management.service';
import { SettingsService } from './core/settings/settings.service';

import {
  routeAnimations,
  LocalStorageService,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme
} from './core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from './core/settings/settings.actions';
import { settings } from 'cluster';

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

  stickyHeader$: Observable<boolean>;
  theme$: Observable<string>;

  constructor(
    public authManagementService: AuthManagementService,
    public settingsService: SettingsService,
    private store: Store,
    private storageService: LocalStorageService
  ) {}

  private static isIEorEdgeOrSafari() {
    return [ 'ie', 'edge', 'safari' ].includes(browser().name);
  }

  ngOnInit(): void {
    this.theme$ = this.settingsService.settings$.pipe(map((settings) =>{
      return  settings.theme
    }));
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
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
