import { v4 as uuid } from 'uuid';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Subject } from 'rxjs';
import { take, takeUntil, map } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'
import { UserDataService } from './user-data.service';
import { User } from '../../../shared/models/user.model';

@Injectable()
export class UserManagementService implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();

  constructor(
    private userDataService: UserDataService
  ) {
    this.getUsers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get users() {
    return this._users.getValue();
  }

  getUsers() {
    this.userDataService.getUsers().pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.usersNext(res.users);
        }
      );
  }

  createUser(user: User) {
    this.userDataService.createUser(user).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getUsers();
      });
  }

  updateUser(user: User): Observable<any> {
    return this.userDataService.updateUser(user).pipe(
      take(1),
      takeUntil(this.destroy$),
      map(() => {
        this.getUsers()
      })

    );
  }

  uploadImgUser(user: User, imagen: any): Observable<any> {
    return this.userDataService.uploadImgUser(user, imagen).pipe(
      take(1),
      takeUntil(this.destroy$));
  }

  deleteUser(user: User) {
    this.userDataService.deleteUser(user).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getUsers();
      });
  }

  private usersNext(users: User[]) {
    this._users.next(users);
  }
}

