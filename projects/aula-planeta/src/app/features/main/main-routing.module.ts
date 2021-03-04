import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';

const routes: Routes = [
  {
    path: '',
    component: MisMateriasComponent,
    data: { title: 'aula-planeta.menu.mis-materias' },
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
