import { Pipe, PipeTransform } from '@angular/core';
import { Todo, TodosFilter } from '../../shared/models/todos.model';

@Pipe({
  name: 'todos'
})
export class TodosPipe implements PipeTransform {
  transform(todos: Todo[], filter: TodosFilter): unknown {
    if (!todos || filter === 'ALL') {
      return todos;
    } else if (filter === 'DONE') {
      return todos.filter((todo) => todo.done);
    } else {
      return todos.filter((todo) => !todo.done);
    }
  }
}
