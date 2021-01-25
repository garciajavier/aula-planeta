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

  /**
   * Contains remove Done boolean
   */
  private removeDoneDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  removeDoneDisabled$ = this.removeDoneDisabled.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const todos = this.localStorageService.getItem(TODOS_KEY);
    this.todoNext(todos ? todos : []);
  }

  /**
   * Add a new Todo
   * @param todoName 
   */
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

  /**
   * Update Todo
   * @param todo 
   */
  updateTodo(todo: Todo) {
    const todos = this.todos.getValue();
    const indexToUpdate = todos.findIndex((t) => t.id === todo.id);
    todos[indexToUpdate] = todo;
    this.todoNext(todos);
  }

  /**
   * Toggle Todo done check
   * @param id 
   */
  toggleTodo(id: string) {
    this.todoNext(this.todos.getValue().map((item: Todo) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  /**
   * Remove Todo
   */
  removeDone() {
    this.todoNext(this.todos.getValue().filter((item: Todo) => !item.done));
  }

  /**
   * emit the Todo observable
   */
  reload() {
    this.todoNext(this.todos.getValue());
  }

  /**
   * Emit if can enable remove botton
   */
  private isRemoveDoneDisabled() {
    this.removeDoneDisabled.next(!this.todos.getValue().some((item: Todo) => item.done));
  }

  /**
   * Emit a Todo list
   * @param todos
   */
  private todoNext(todos: Todo[]) {
    this.localStorageService.setItem(TODOS_KEY, todos);
    this.todos.next(todos);
    this.isRemoveDoneDisabled();
  }
}
