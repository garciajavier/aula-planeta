import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../core/local-storage/local-storage.service';
import { User } from '../../../shared/models/user.model';

const INITIAL_DATA: User[] = [
  { id: uuid(), username: 'rockets', name: 'Elon', surname: 'Musk' },
  { id: uuid(), username: 'investing', name: 'Nassim', surname: 'Taleb' },
  { id: uuid(), username: 'philosophy', name: 'Yuval', surname: 'Harari' }
];

@Injectable()
export class UserService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const users = this.localStorageService.getItem('EXAMPLES.USERS');
    this.usersNext(users ? users : INITIAL_DATA);
  }

  get users() {
    return this._users.getValue();
  }

  addUser(user: User) {
    this.users.push({ ...user, id: uuid() } as User);
    this.usersNext(this.users);
  }

  updateUser(user: User) {
    const indexToUpdate = this.users.findIndex((u) => u.id === user.id);
    this.users[indexToUpdate] = user;
    this.usersNext(this.users);
  }

  removeUser(id: string) {
    const indexToRemove = this.users.findIndex((user) => user.id === id);
    this.users.splice(indexToRemove, 1);
    this.usersNext(this.users);
  }

  private usersNext(users: User[]) {
    this._users.next(users);
  }
}

