import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'examples',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'examples',
        loadChildren: () => import('./features/examples/examples.module').then((m) => m.ExamplesModule),
        canActivate: [AuthGuardService],
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
