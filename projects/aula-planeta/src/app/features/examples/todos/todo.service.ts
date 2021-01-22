import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../../../core/core.module';

const INITIAL_DATA: Todo[] = [
  { id: uuid(), name: 'rockets', done: true },
  { id: uuid(), name: 'investing', done: false },
  { id: uuid(), name: 'philosophy', done: false }
];

@Injectable()
export class TodoService {
  todos$: Observable<Todo[]>;
  filter$: Observable<string> = of('ALL');

  private model: Model<Todo[]>;
  private modelFilter: Model<TodosFilter>;

  constructor(private todoFactory: ModelFactory<Todo[]>, private filterFactory: ModelFactory<TodosFilter>, private localStorageService: LocalStorageService) {
    
    let todos = this.localStorageService.getItem('TODOS')
    let filter = this.localStorageService.getItem('FILTER')

    this.model = this.todoFactory.create(todos && todos.length ? todos : [ ...INITIAL_DATA]);
    this.modelFilter = this.filterFactory.create(filter && filter.length ? filter: 'ALL');
    this.todos$ = this.model.data$;
    this.filter$ = this.modelFilter.data$;
  }

  addTodo(todo: Todo) {
    const todos = this.model.get();
    todos.push(todo);
    this.model.set(todos);
    this.localStorageService.setItem('TODOS', todos);
  }

  updateTodo(todo: Todo) {
    const todos = this.model.get();
    const indexToUpdate = todos.findIndex((t) => t.id === todo.id);
    todos[indexToUpdate] = todo;
    this.model.set(todos);
    this.localStorageService.setItem('TODOS', todos);
  }

  removeTodo(id: string) {
    const todos = this.model.get();
    const indexToRemove = todos.findIndex((todo) => todo.id === id);
    todos.splice(indexToRemove, 1);
    this.model.set(todos);
    this.localStorageService.setItem('TODOS', todos);
  }

  removeDoneTodos() {
    const todos = this.model.get();
    this.model.set(todos.filter((todo) => !todo.done));
    this.localStorageService.setItem('TODOS', todos);
  }

  updateFilter(filter) {
    this.modelFilter.set(filter);
    this.localStorageService.setItem('FILTER', filter);
  }
}

export interface Todo {
  id: string;
  name: string;
  done: boolean;
}

export type TodosFilter = 'ALL' | 'DONE' | 'ACTIVE';