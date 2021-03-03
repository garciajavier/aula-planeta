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
    private userDataService: UserDataService
  ) {
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

  createUser(user: User) {
    this.userDataService.createUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  updateUser(user: User) {
    this.userDataService.updateUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(user: User) {
    this.userDataService.deleteUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  private usersNext(users: User[]) {
    this._users.next(users);
  }
}

