import { selectTodosFilter } from './../todos.selectors';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '../../../../core/core.module';

import * as todoActions from '../todos.actions';
import { Todo, TodosFilter } from '../todos.model';
import { selectTodos, selectRemoveDoneTodosDisabled } from '../todos.selectors';
import { TodosManagementService } from '../services/todos-management.service';

@Component({
  selector: 'aula-planeta-todos',
  templateUrl: './todos-container.component.html',
  styleUrls: [ './todos-container.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  filter: TodosFilter;
  removeDoneDisabled: boolean;
  newTodo = '';

  constructor(
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    public todosManagementService: TodosManagementService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.removeDoneDisabled = !this.todosManagementService.isSomeTodoDone();
  }
  
  get isAddTodoDisabled() {
    return this.newTodo.length < 4;
  }

  onNewTodoChange(newTodo: string) {
    this.newTodo = newTodo;
  }
  
  onNewTodoClear() {
    this.newTodo = '';
  }
  
  onAddTodo() {
    this.todosManagementService.addTodo(this.newTodo);
    const addedMessage = this.translateService.instant('aula-planeta.examples.todos.added.notification', {
      name: this.newTodo
    });
    this.notificationService.info(addedMessage);
    this.newTodo = '';
  }
  
  onToggleTodo(todo: Todo) {
    this.todosManagementService.toggleTodo(todo.id);
    this.removeDoneDisabled = !this.todosManagementService.isSomeTodoDone();
    const newStatus = this.translateService.instant(
      `aula-planeta.examples.todos.filter.${todo.done ? 'active' : 'done'}`
      );
      const undo = this.translateService.instant('aula-planeta.examples.todos.undo');
    const toggledMessage = this.translateService.instant('aula-planeta.examples.todos.toggle.notification', {
      name: todo.name
    });

    this.snackBar
      .open(`${toggledMessage} ${newStatus}`, undo, {
        duration: 2500,
        panelClass: 'todos-notification-overlay'
      })
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.onToggleTodo({ ...todo, done: !todo.done }));
  }

  onRemoveDoneTodos() {
    this.todosManagementService.removeDone();
    const removedMessage = this.translateService.instant('aula-planeta.examples.todos.remove.notification');
    this.notificationService.info(removedMessage);
  }

  onFilterTodos(filter: TodosFilter) {
    this.filter = filter;
    this.todosManagementService.reload();
    const filterToMessage = this.translateService.instant('aula-planeta.examples.todos.filter.notification');
    const filterMessage = this.translateService.instant(`aula-planeta.examples.todos.filter.${filter.toLowerCase()}`);
    this.notificationService.info(`${filterToMessage} ${filterMessage}`);
  }
}
