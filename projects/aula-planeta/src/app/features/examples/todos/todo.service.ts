import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { Model, ModelFactory } from '@angular-extensions/model';
import { Observable } from 'rxjs';

const INITIAL_DATA: Todo[] = [
  { id: uuid(), name: 'rockets', done: true },
  { id: uuid(), name: 'investing', done: false },
  { id: uuid(), name: 'philosophy', done: false }
];

@Injectable()
export class TodoService {
  todos$: Observable<Todo[]>;

  private model: Model<Todo[]>;

  constructor(private modelFactory: ModelFactory<Todo[]>) {
    this.model = this.modelFactory.create([...INITIAL_DATA]);
    this.todos$ = this.model.data$;
  }

  addTodo(todo: Partial<Todo>) {
    const todos = this.model.get();
    todos.push({ ...todo, id: uuid() } as Todo);
    this.model.set(todos);
  }

  updateTodo(todo: Todo) {
    const todos = this.model.get();
    const indexToUpdate = todos.findIndex((t) => t.id === todo.id);
    todos[indexToUpdate] = todo;
    this.model.set(todos);
  }

  removeTodo(id: string) {
    const todos = this.model.get();
    const indexToRemove = todos.findIndex((todo) => todo.id === id);
    todos.splice(indexToRemove, 1);
    this.model.set(todos);
  }
}

export interface Todo {
  id: string;
  name: string;
  done: boolean;
}
