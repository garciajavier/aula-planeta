import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'

import { environment as env } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TitleService implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private title: Title
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  setTitle(
    snapshot: ActivatedRouteSnapshot,
    lazyTranslateService?: TranslateService
  ) {
    let lastChild = snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    const translate = lazyTranslateService || this.translateService;
    if (title) {
      translate
        .get(title)
        .pipe(filter((translatedTitle) => translatedTitle !== title))
        .pipe(
          take(1),
          takeUntil(this.destroy$))
        .subscribe((translatedTitle) =>
          this.title.setTitle(`${translatedTitle} - ${env.appName}`)
        );
    } else {
      this.title.setTitle(env.appName);
    }
  }
}
