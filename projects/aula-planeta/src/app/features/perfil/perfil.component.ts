import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthManagementService, routeAnimations } from '../../core/core.module';

@Component({
  selector: 'aula-planeta-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PerfilComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  tabs = [];

  constructor(
    private translateService: TranslateService,
    // private settingsService: SettingsService,
    private authManagementService: AuthManagementService
  ) { }

  ngOnInit(): void {
    // this.settingsService.settings$.pipe(
    //   takeUntil(this.destroy$))
    //   .subscribe(({ language }) => this.translateService.use(language));
    this.tabs = [
      {
        link: 'datos',
        label: 'aula-planeta.perfil.menu.datos',
        auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      },
      {
        link: 'tutores',
        label: 'aula-planeta.perfil.menu.tutores',
        auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      },
      {
        link: 'contrasena',
        label: 'aula-planeta.perfil.menu.contrasena',
        auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      },
      {
        link: 'activacion',
        label: 'aula-planeta.perfil.menu.activacion',
        auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      },
      {
        link: 'vincular',
        label: 'aula-planeta.perfil.menu.vincular',
        auth: !this.authManagementService.userCan(['PROFESOR_ROLE'])
      },
      {
        link: 'users',
        label: 'aula-planeta.perfil.menu.users',
        auth: !this.authManagementService.userCan(['ADMIN_ROLE'])
      },
      {
        link: 'settings',
        label: 'aula-planeta.perfil.menu.settings',
        auth: !this.authManagementService.userCan(['ADMIN_ROLE'])
      }
    ];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}