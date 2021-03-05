import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { AuthGuardService } from './core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
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
        path: 'perfil',
        loadChildren: () => import('./features/perfil/perfil.module').then((m) => m.PerfilModule),
        canActivate: [AuthGuardService],
      },
      {
        path: 'inicio',
        loadChildren: () => import('./features/main/main.module').then((m) => m.MainModule),
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
      useHash: true,
      scrollPositionRestoration: 'disabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
