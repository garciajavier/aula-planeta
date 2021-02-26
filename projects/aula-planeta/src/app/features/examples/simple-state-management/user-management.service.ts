import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../core/local-storage/local-storage.service';
import { User } from '../../../shared/models/user.model';

const INITIAL_DATA: User[] = [
  { uuid: uuid(), email: 'elon@musk.com', firstName: 'Elon', lastName: 'Musk' },
  { uuid: uuid(), email: 'nassim@taleb.com', firstName: 'Nassim', lastName: 'Taleb' },
  { uuid: uuid(), email: 'yuval@harari', firstName: 'Yuval', lastName: 'Harari' }
];

@Injectable()
export class UserManagementService {
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
    this.users.push({ ...user, uuid: uuid() } as User);
    this.usersNext(this.users);
  }

  updateUser(user: User) {
    const indexToUpdate = this.users.findIndex((u) => u.uuid === user.uuid);
    this.users[indexToUpdate] = user;
    this.usersNext(this.users);
  }

  removeUser(uuid: string) {
    const indexToRemove = this.users.findIndex((user) => user.uuid === uuid);
    this.users.splice(indexToRemove, 1);
    this.usersNext(this.users);
  }

  private usersNext(users: User[]) {
    this._users.next(users);
  }
}

