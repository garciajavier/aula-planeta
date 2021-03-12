import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogContainerComponent } from './dialogs/dialog-container.component';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';

const routes: Routes = [
  {
    path: '',
    component: MisMateriasComponent,
    data: { title: 'aula-planeta.menu.mis-materias' }
  },
  {
    path: 'dialogos',
    component: DialogContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
