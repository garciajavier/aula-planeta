import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { routeAnimations } from '../../core/core.module';
import { SettingsService } from '../../core/settings/settings.service';
import { AuthManagementService } from '../../core/auth/auth-management.service';

@Component({
  selector: 'aula-planeta-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  examples = [];

  constructor(
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private authManagementService: AuthManagementService
  ) { }

  ngOnInit(): void {
    this.settingsService.settings$.subscribe(({ language }) => this.translateService.use(language));
    this.examples = [
      { link: 'todos', label: 'aula-planeta.examples.menu.todos' },
      {
        link: 'simple-state-management',
        label: 'aula-planeta.examples.menu.simple-state-management',
        // auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      }
    ];
  }
}
