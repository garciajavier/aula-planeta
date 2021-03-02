import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../../../core/local-storage/local-storage.service';
import { User } from '../../../shared/models/user.model';
import { UserDataService } from '../../../services/data/user/user-data.service';

const INITIAL_DATA: User[] = [
  new User('Elon', 'Musk', 'elon@musk.com', uuid()),
  new User('Nassim', 'Taleb', 'nassim@taleb.com', uuid()),
  new User('Yuval', 'Harari', 'yuval@harari', uuid())
];

@Injectable()
export class UserManagementService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private userDataService: UserDataService
  ) {
    // const users = this.localStorageService.getItem('EXAMPLES.USERS');
    this.getUsers();
  }

  get users() {
    return this._users.getValue();
  }

  getUsers() {
    return this.userDataService.getUsers().subscribe(
      res => {
        this.usersNext(res.users);
      }
    );
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

