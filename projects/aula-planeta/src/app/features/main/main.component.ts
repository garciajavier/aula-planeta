import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthManagementService } from '../../core/auth/auth-management.service';
import { Observable } from 'rxjs';
import { SettingsService } from '../../core/settings/settings.service';
import { environment as env } from '../../../environments/environment';
import { Settings } from '../../shared/models/settings.model';
import { routeAnimations } from '../../core/animations/route.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'aula-planeta-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routeAnimations ]
})
export class MainComponent implements OnInit {

  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../../assets/logo_PLANETA72x72.png').default;
  languages = [ 'en', 'de', 'sk', 'fr', 'es', 'pt-br', 'zh-cn', 'he' ];
  navigation = [ { link: 'examples', label: 'aula-planeta.menu.examples' } ];
  navigationSideMenu = [ ...this.navigation, { link: 'settings', label: 'aula-planeta.menu.settings' } ];

  sideconf = {
    fixed: false,
    open: true
  };

  settings$: Observable<Settings>;

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

}
