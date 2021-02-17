import { Platform } from '@angular/cdk/platform';
import { Injectable, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SwUpdate } from '@angular/service-worker';
import { Subject, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PromptComponent } from './components/prompt/prompt-component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService implements OnDestroy {
  private promptEvent: any;
  /**
   * Use to destroy and prevent memory leaks
   */
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
    private swUpdate: SwUpdate,
    private translateService: TranslateService
  ) {}

  public initPwaPrompt() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
        if (confirm(this.translateService.instant('aula-planeta.pwa.new-version'))) {
          window.location.reload();
        }
      });
    }

    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = 'standalone' in window.navigator && window.navigator['standalone'];
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
