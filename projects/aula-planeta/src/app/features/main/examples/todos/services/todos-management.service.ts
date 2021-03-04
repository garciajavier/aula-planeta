import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { LocalStorageService } from '../../../../../core/local-storage/local-storage.service';
import { Todo, TodosFilter } from '../../../../../shared/models/todos.model';

export const TODOS_KEY = 'EXAMPLES.TODOS';
export const TODOS_FILTER_KEY = 'EXAMPLES.TODOS.FILTER';

@Injectable({
  providedIn: 'root'
})
export class TodosManagementService {
  /**
   * Contains the todos list
   */
  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todos$ = this._todos.asObservable();

  /**
   * Contains remove Done boolean
   */
  private _removeDoneDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  removeDoneDisabled$ = this._removeDoneDisabled.asObservable();

  /**
   * Contains remove Done boolean
   */
  private _filter: BehaviorSubject<TodosFilter> = new BehaviorSubject<TodosFilter>('ALL');
  filter$ = this._filter.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.getItem(TODOS_KEY).subscribe(todos => {
      this.todoNext(todos ? todos : []);
      this.localStorageService.getItem(TODOS_FILTER_KEY).subscribe(todosFilter => {
        this._filter.next(todosFilter ? todosFilter : 'ALL');
      });

    });
  }

  get todos() {
    return this._todos.getValue();
  }

  get removeDoneDisabled() {
    return this._removeDoneDisabled.getValue();
  }

  get filter() {
    return this.filter.getValue();
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
      ...this.todos
    ]);
  }

  /**
   * Toggle Todo done check
   * @param id 
   */
  toggleTodo(id: string) {
    this.todoNext(this.todos.map((item: Todo) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  /**
   * Remove Todo
   */
  removeDone() {
    this.todoNext(this.todos.filter((item: Todo) => !item.done));
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
    this._removeDoneDisabled.next(!this.todos.some((item: Todo) => item.done));
  }

  /**
   * Emit a Todo list
   * @param todos
   */
  private todoNext(todos: Todo[]) {
    this.localStorageService.setItem(TODOS_KEY, todos).subscribe();
    this._todos.next(todos);
    this.isRemoveDoneDisabled();
  }

  /**
   * Emit a Todo list
   * @param todos
   */
  private filterNext(filter: TodosFilter) {
    this.localStorageService.setItem(TODOS_FILTER_KEY, filter).subscribe();
    this._filter.next(filter);
  }
}
