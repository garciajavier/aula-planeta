import { Pipe, PipeTransform } from '@angular/core';

import { Todo } from './todo.service';

@Pipe({ name: 'todoFilter' })
export class TodoFilterPipe implements PipeTransform {
  transform(todos: Todo[], filter) {
    if (filter == 'ALL' || !filter) {
      return todos;
    } else {
      return (filter == 'DONE') ? todos.filter(todo => todo.done) : todos.filter(todo => !todo.done);
    }
  }
}