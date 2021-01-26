import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import {
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeLanguage,
  actionSettingsChangeTheme,
  actionSettingsChangeStickyHeader
} from '../../../core/settings/settings.actions';
import { SettingsState, State } from '../../../core/settings/settings.model';
import { selectSettings } from '../../../core/settings/settings.selectors';
import { SettingsService } from '../../../core/settings/settings.service';

@Component({
  selector: 'aula-planeta-settings',
  templateUrl: './settings-container.component.html',
  styleUrls: [ './settings-container.component.scss' ]
})
export class SettingsContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  settings$: Observable<SettingsState>;

  themes = [
    { value: 'default-theme', label: 'blue' },
    { value: 'light-theme', label: 'light' },
    { value: 'nature-theme', label: 'nature' },
    { value: 'black-theme', label: 'dark' }
  ];

  languages = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' },
    { value: 'sk', label: 'Slovenčina' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'pt-br', label: 'Português' },
    { value: 'zh-cn', label: '简体中文' },
    { value: 'he', label: 'עברית' }
  ];

  constructor(public settingsService: SettingsService) {}

  ngOnInit() {}

  onLanguageSelect({ value: language }) {
    this.settingsService.changeSetting('language', language);
  }

  onThemeSelect({ value: theme }) {
    this.settingsService.changeSetting('theme', theme);
  }

  onAutoNightModeToggle({ checked: autoNightMode }) {
    this.settingsService.changeSetting('autoNightMode', autoNightMode);
  }

  onStickyHeaderToggle({ checked: stickyHeader }) {
    this.settingsService.changeSetting('stickyHeader', stickyHeader);
  }

  onPageAnimationsToggle({ checked: pageAnimations }) {
    this.settingsService.changeSetting('pageAnimations', pageAnimations);
  }

  onElementsAnimationsToggle({ checked: elementsAnimations }) {
    this.settingsService.changeSetting('elementsAnimations', elementsAnimations);
  }
}
