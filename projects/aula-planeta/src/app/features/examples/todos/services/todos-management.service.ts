import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../todo.service';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../../../../core/local-storage/local-storage.service';

export const TODOS_KEY = 'EXAMPLES.TODOS';

@Injectable({
  providedIn: 'root'
})
export class TodosManagementService {
  /**
   * Contains the todos list
   */
  private todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.todoNext(this.localStorageService.getItem(TODOS_KEY));
  }

  addTodo(todoName: string) {
    this.todoNext([
      {
        id: uuid(),
        name: todoName,
        done: false
      },
      ...this.todos.getValue()
    ]);
  }

  updateTodo(todo: Todo) {
    const todos = this.todos.getValue();
    const indexToUpdate = todos.findIndex((t) => t.id === todo.id);
    todos[indexToUpdate] = todo;
    this.todoNext(todos);
  }

  toggleTodo(id: string) {
    this.todoNext(
      this.todos.getValue().map((item: Todo) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  removeDone(){
    this.todoNext(this.todos.getValue().filter((item: Todo) => !item.done));
  }

  reload() {
    this.todoNext(this.todos.getValue());
  }
  
  isSomeTodoDone(): boolean{
    return this.todos.getValue().some((item: Todo) => item.done)
  }

  private todoNext(todos: Todo[]) {
    this.localStorageService.setItem(TODOS_KEY, todos);
    this.todos.next(todos);
  }
}
