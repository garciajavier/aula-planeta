import { Pipe, PipeTransform } from '@angular/core';
import { TodosFilter } from '../../../features/examples/todos/todos.model';
import { Todo } from '../../../features/examples/todos/todo.service';

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
