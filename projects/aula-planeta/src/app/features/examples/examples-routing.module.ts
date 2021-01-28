import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/core.module';

import { ExamplesComponent } from './examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { UserComponent } from './simple-state-management/components/user.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosContainerComponent,
        data: { title: 'aula-planeta.examples.menu.todos' }
      },
      {
        path: 'simple-state-management',
        component: UserComponent,
        canActivate: [AuthGuardService],
        data: { title: 'aula-planeta.examples.menu.simple-state-management' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
