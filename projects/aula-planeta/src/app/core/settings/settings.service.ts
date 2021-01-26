import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Settings } from '../../shared/models/settings.model';
import { NIGHT_MODE_THEME } from './settings.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export const initial: Settings = {
  language: 'en',
  theme: 'default-theme',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0
};

export const SETTINGS_KEY = 'SETTINGS';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  /**
   * Contains the SomeThink list
   */
  private settings: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  settings$ = this.settings.asObservable();

  constructor(private localStorageService: LocalStorageService, private translateService: TranslateService, private overlayContainer: OverlayContainer) {
    let settings = this.localStorageService.getItem(SETTINGS_KEY);
    settings = settings ? settings : initial;
    this.translateService.setDefaultLang(settings.language);
    this.settingsNext(settings);
  }

  /**
   * Update setting
   * @param key Name atribute setting
   * @param value Value os atribute
   */
  changeSetting(key: string, value: any) {
    switch (key) {
      case 'theme':
        this.updateTheme(value);
        break;
      case 'language':
        this.setTranslateServiceLanguage(value);
        break;
    }
    this.settingsNext({ ...this.settings.getValue(), [key]: value });
  }

  private updateTheme(effectiveTheme: string) {
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  private setTranslateServiceLanguage(lang: string) {
    this.translateService.use(lang);
  }

  /**
   * Emit a settings
   * @param SomeThink
   */
  private settingsNext(settings: Settings) {
    this.localStorageService.setItem(SETTINGS_KEY, settings);
    this.settings.next(settings);
  }
}
