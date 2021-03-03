import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { NIGHT_MODE_THEME, Settings } from '../../shared/models/settings.model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { TitleService } from '../title/title.service';
import { AnimationsService } from '../core.module';

export const initial: Settings = {
  language: 'es',
  theme: 'default-theme',
  autoNightMode: false,
  nightTheme: NIGHT_MODE_THEME,
  stickyHeader: true,
  pageAnimations: false,
  pageAnimationsDisabled: false,
  elementsAnimations: false,
  hour: 0
};

export const SETTINGS_KEY = 'SETTINGS';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  hour = new Date().getHours();

  /**
   * Contains the SomeThink list
   */
  private _settings: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  settings$ = this._settings.asObservable();

  constructor(
    private router: Router,
    private overlayContainer: OverlayContainer,
    private localStorageService: LocalStorageService,
    private titleService: TitleService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private ngZone: NgZone
  ) {
    this.localStorageService.getItem(SETTINGS_KEY).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe(settings => {
        settings = settings ? settings : initial;
        this.setTranslateServiceLanguage(settings.language);
        this.updateTheme(settings.theme);
        this.updateRouteAnimationType(settings.pageAnimations, settings.elementsAnimations);
        this.modeNight();
        this.settingsNext(settings);
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  get settings() {
    return this._settings.getValue();
  }

  modeNight() {
    this.ngZone.runOutsideAngular(() => {
      interval(60000).pipe(
        takeUntil(this.destroy$)).subscribe(() => {
          const hour = new Date().getHours();
          if (hour !== this.hour) {
            this.hour = hour;
            this.ngZone.run(() => {
              if (this.settings.autoNightMode && (hour >= 21 || hour <= 7)) {
                this.settingsNext({ ...this.settings });
              }
            });
          }
        });
    });
  }

  /**
   * Update setting
   * @param key Name atribute setting
   * @param value Value os atribute
   */
  changeSetting(key: string, value: any) {
    const { pageAnimations, elementsAnimations } = this.settings;
    switch (key) {
      case 'theme':
        this.updateTheme(value);
        break;
      case 'language':
        this.setTranslateServiceLanguage(value);
        break;
      case 'pageAnimations':
        this.updateRouteAnimationType(!pageAnimations, elementsAnimations);
      case 'elementsAnimations':
        this.updateRouteAnimationType(pageAnimations, !elementsAnimations);
        break;
    }
    this.settingsNext({ ...this.settings, [key]: value });
  }

  private updateTheme(effectiveTheme: string) {
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) => item.includes('-theme'));
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  private updateRouteAnimationType(pageAnimations, elementsAnimations) {
    this.animationsService.updateRouteAnimationType(pageAnimations, elementsAnimations);
  }

  private setTranslateServiceLanguage(lang: string) {
    this.translateService.use(lang);
    this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService);
  }

  /**
   * Emit a settings
   * @param SomeThink
   */
  private settingsNext(settings: Settings) {
    this.localStorageService.setItem(SETTINGS_KEY, settings).pipe(
      take(1),
      takeUntil(this.destroy$)).subscribe();
    this._settings.next(settings);
  }
}
