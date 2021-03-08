import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { UserComponent } from './components/users/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DatosComponent } from './components/datos/datos.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { ContrasenaComponent } from './components/contrasena/contrasena.component';
import { ActivacionComponent } from './components/activacion/activacion.component';
import { VincularComponent } from './components/vincular/vincular.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/perfil/datos'
  },
  {
    path: '',
    component: PerfilComponent,
    data: { title: 'aula-planeta.menu.perfil' },
    children: [
      {
        path: 'datos',
        component: DatosComponent,
      },
      {
        path: 'tutores',
        component: TutoresComponent,
      },
      {
        path: 'contrasena',
        component: ContrasenaComponent,
      },
      {
        path: 'activacion',
        component: ActivacionComponent,
      },
      {
        path: 'vincular',
        component: VincularComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
