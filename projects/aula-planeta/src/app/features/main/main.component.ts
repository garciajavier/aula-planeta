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
import { callbackify } from 'util';

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
  navigationSideMenu = null;
  user: User;
  imgProfile: string;

  //TODO: RouterLinkActive in submenu.
  teacherMenu = [
    {
      icon: ['fas', 'book'],
      link: '',
      label: 'aula-planeta.menu.subjects',
      submenu: null
    },
    {
      icon: ['fas', 'users'],
      link: 'perfil',
      label: 'aula-planeta.menu.evaluation',
      submenu: [
        {
          link: '/',
          label: 'aula-planeta.menu.homework',
          submenu: null
        },
        {
          link: '#',
          label: 'aula-planeta.menu.student-work',
          submenu: null
        },
        {
          link: '#',
          label: 'aula-planeta.menu.student-management',
          submenu: null
        }
      ]
    }
  ]

  studentMenu = [
    {
      icon: ['fas', 'home'],
      link: '/',
      label: 'aula-planeta.student-menu.home',
      submenu: null
    },
    {
      icon: ['fas', 'book'],
      link: 'examples',
      label: 'aula-planeta.student-menu.my-work',
      submenu: [
        {
          link: 'settings',
          label: 'aula-planeta.student-menu.homework',
          submenu: null
        },
        {
          link: 'settings',
          label: 'aula-planeta.student-menu.regions-works',
          submenu: null
        },
        {
          link: 'settings',
          label: 'aula-planeta.menu.student-management',
          submenu: null
        }
      ]
    },
    {
      icon: ['fas', 'check-circle'],
      link: '/',
      label: 'aula-planeta.student-menu.notes',
      submenu: null
    },
    {
      icon: ['fas', 'hourglass-half'],
      link: '/',
      label: 'aula-planeta.student-menu.previous-courses',
      submenu: null
    }
  ]

  secondaryMenu = [
    {
      icon: ['fas', 'newspaper'],
      link: '#',
      label: 'aula-planeta.other-menu.inquiry-environment'
    },
    {
      icon: ['fas', 'search'],
      link: '#',
      label: 'aula-planeta.other-menu.search'
    },
    {
      icon: ['fas', 'question-circle'],
      link: '#',
      label: 'aula-planeta.other-menu.help'
    },
    {
      icon: ['fas', 'chalkboard-teacher'],
      link: '#',
      label: 'aula-planeta.other-menu.teaching-material'
    }
  ]

  isScrolling = false;

  sideconf = {
    fixed: false,
    open: false
  };

  userMenu = false;

  settings$: Observable<Settings>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    public authManagementService: AuthManagementService,
    public settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.authManagementService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.imgProfile = (this.user.google) ? this.user.img : `${env.apiUrl}/upload/user/${this.user.img}`;
          this.navigationSideMenu = this.user.role.some(e => e.name === '"ALUMNO_ROLE"') ? this.studentMenu : this.teacherMenu;
        }
      });
  }

  onLogoutClick() {
    this.router.navigate(['/login']);
    this.authManagementService.authLogout();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidenav(sidenav) {
    sidenav.toggle()
    this.sideconf.open = !this.sideconf.open;
  }

  toggleMenu(val) {
    this.userMenu = val;
  }

  @HostListener('window:scroll', ['$event'])
  eventoScroll($event) {
    let scrollOffset = $event.srcElement.children[0].scrollTop;
    this.isScrolling = scrollOffset > 0 ? true : false;
  }
}
