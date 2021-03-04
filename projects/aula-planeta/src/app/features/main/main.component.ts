import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';
import { AuthManagementService } from '../../core/auth/auth-management.service';
import { Observable, Subject } from 'rxjs';
import { SettingsService } from '../../core/settings/settings.service';
import { environment as env } from '../../../environments/environment';
import { Settings } from '../../shared/models/settings.model';
import { routeAnimations } from '../../core/animations/route.animations';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';
import { take, takeUntil } from 'rxjs/operators';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'aula-planeta-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimations]
})
export class MainComponent implements OnInit, OnDestroy {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../../assets/logo_PLANETA72x72.png').default;
  languages = ['en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he'];
  navigation = [{ link: 'inicio', label: 'aula-planeta.menu.mis-materias' }];
  navigationSideMenu = [...this.navigation, { link: 'settings', label: 'aula-planeta.menu.settings' }];
  isScrolling = false;

  sideconf = {
    fixed: false,
    open: true
  };

  settings$: Observable<Settings>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public authManagementService: AuthManagementService,
    public settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  onLogoutClick() {
    this.router.navigate(['/login']);
    this.authManagementService.authLogout();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  eventoScroll($event) {
    let scrollOffset = $event.srcElement.children[0].scrollTop;
    this.isScrolling = scrollOffset > 0 ? true : false;
  }
}
