import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../../../../core/local-storage/local-storage.service';
import { Todo, TodosFilter } from '../../../../shared/models/todos.model';
import { filter } from 'rxjs/operators';


export const TODOS_KEY = 'EXAMPLES.TODOS';
export const TODOS_FILTER_KEY = 'EXAMPLES.TODOS.FILTER';

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

  /**
   * Contains remove Done boolean
   */
  private filter: BehaviorSubject<TodosFilter> = new BehaviorSubject<TodosFilter>('ALL');
  filter$ = this.filter.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const todos = this.localStorageService.getItem(TODOS_KEY);
    this.todoNext(todos ? todos : []);
    const todosFilter = this.localStorageService.getItem(TODOS_FILTER_KEY);
    this.filter.next(todosFilter ? todosFilter : 'ALL');
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
  updateFilter(filter: TodosFilter) {
    this.filterNext(filter);
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

  /**
   * Emit a Todo list
   * @param todos
   */
  private filterNext(filter: TodosFilter) {
    this.localStorageService.setItem(TODOS_FILTER_KEY, filter);
    this.filter.next(filter);
  }
}
