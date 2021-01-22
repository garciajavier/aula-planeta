import { v4 as uuid } from 'uuid';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Todo, TodosFilter, TodoService } from '../todo.service';

import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../../../core/core.module';

@Component({
  selector: 'aula-planeta-todos',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  todos$: Observable<Todo[]>;
  filter$: Observable<TodosFilter>;
  newTodo = '';

  constructor(
    public todoService: TodoService,
    public snackBar: MatSnackBar,
    public translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

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
    this.todoService.addTodo({ id: uuid(), name: this.newTodo, done: false});
    const addedMessage = this.translateService.instant(
      'aula-planeta.examples.todos.added.notification',
      { name: this.newTodo }
    );
    this.notificationService.info(addedMessage);
    this.newTodo = '';
  }

  onToggleTodo(todo: Todo) {

    this.todoService.updateTodo({...todo, done: !todo.done});
    const newStatus = this.translateService.instant(
      `aula-planeta.examples.todos.filter.${todo.done ? 'active' : 'done'}`
    );
    const undo = this.translateService.instant('aula-planeta.examples.todos.undo');
    const toggledMessage = this.translateService.instant(
      'aula-planeta.examples.todos.toggle.notification',
      { name: todo.name }
    );

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
    this.todoService.removeDoneTodos();
    const removedMessage = this.translateService.instant(
      'aula-planeta.examples.todos.remove.notification'
    );
    this.notificationService.info(removedMessage);
  }

  onFilterTodos(filter) {
    this.todoService.updateFilter(filter);
    const filterToMessage = this.translateService.instant(
      'aula-planeta.examples.todos.filter.notification'
    );
    const filterMessage = this.translateService.instant(
      `aula-planeta.examples.todos.filter.${filter.toLowerCase()}`
    );
    this.notificationService.info(`${filterToMessage} ${filterMessage}`);
  }
}
