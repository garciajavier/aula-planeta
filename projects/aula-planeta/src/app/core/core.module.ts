import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';

import { environment } from '../../environments/environment';

import { TitleService } from './title/title.service';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { AppErrorHandler } from './error-handler/app-error-handler.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { LoadingInterceptor } from './http-interceptors/loading.interceptor';
import { NotificationService } from './notifications/notification.service';
import { faCog, faBars, faRocket, faPowerOff, faUserCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faMediumM, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { JwtInterceptor } from './http-interceptors/jwt.interceptor';
import { AuthManagementService } from './auth/auth-management.service';
import { MaterialModule } from '../material/material.module';
import { DirectivesModule } from './directives/directives.module';
import { PwaService } from './pwa/pwa.service';
import { PromptComponent } from './pwa/components/prompt/prompt-component';
import { ProgressSpinnerService } from './progress-spinner/progress-spinner.service';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { GoogleLoginProvider, MicrosoftLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { NetworkConnection } from './network-connection/network-connection.service';
import { DEFAULT_CONFIG, NgForageOptions, NgForageConfig, Driver } from 'ngforage';
import { LocalCacheService } from './load-cache/load-cache.service';

export {
  TitleService,
  routeAnimations,
  LocalStorageService,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService,
  AuthManagementService,
  NotificationService
};

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.i18nPrefix}/assets/i18n/`, '.json');
}

const initializerPwaService = (pwaService: PwaService) => () => pwaService.initPwaPrompt();
const initializerProgressSpinnerService = (progressSpinnerService: ProgressSpinnerService) => () =>
  progressSpinnerService.initProgressSpinnerService();

const googleLoginOptions = {
  scope: 'profile email openid'
};

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,

    // material
    MaterialModule,

    DirectivesModule,

    SocialLoginModule,

    // 3rd party
    FontAwesomeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [PromptComponent, ProgressSpinnerComponent],
  providers: [
    LocalCacheService,
    NetworkConnection,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerPwaService,
      deps: [PwaService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializerProgressSpinnerService,
      deps: [ProgressSpinnerService],
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GOOGLE_ID, googleLoginOptions
            )
          },
          {
            id: MicrosoftLoginProvider.PROVIDER_ID,
            provider: new MicrosoftLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'aula-planeta',
        driver: [ // defaults to indexedDB -> webSQL -> localStorage
          Driver.INDEXED_DB,
          Driver.LOCAL_STORAGE
        ]
      } as NgForageOptions
    }

    // { provide: RouteReuseStrategy, useClass: RouteReuseService }
  ],
  exports: [
    // angular
    FormsModule,

    MaterialModule,
    DirectivesModule,

    // 3rd party
    FontAwesomeModule,
    TranslateModule
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    faIconLibrary: FaIconLibrary
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(
      faCog,
      faBars,
      faRocket,
      faPowerOff,
      faUserCircle,
      faPlayCircle,
      faGithub,
      faMediumM,
      faTwitter,
      faInstagram,
      faYoutube
    );
  }
}
