import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthManagementService, ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { UserManagementService } from '../../../../services/data/user/user-management.service';
import { Role } from '../../../../shared/models/role.model';
import { User } from '../../../../shared/models/user.model';



@Component({
  selector: 'aula-planeta-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  userForm: FormGroup;
  isEdit$: Observable<{ value: boolean }>;
  role: Role;

  constructor(public userManagementService: UserManagementService, private fb: FormBuilder, public authManagementService: AuthManagementService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      uuid: '',
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      role: [[], [Validators.required]]
    });

    this.isEdit$ = this.userForm
      .get('uuid')
      .valueChanges.pipe(startWith(''), map((uuid) => ({ value: (uuid || '').length > 0 })));

    this.userManagementService.getUsers();
  }

  deleteUser(user: User) {
    this.userManagementService.deleteUser(user);
  }

  editUser(user: User) {
    const roles = user.role.map(role => role._id);
    this.userForm.patchValue({ ...user, role: roles });
  }

  onSubmit(userFormRef: FormGroupDirective) {
    if (this.userForm.valid) {
      const data = this.userForm.getRawValue();
      if (data.uuid && data.uuid.length) {
        delete data.password;
        this.userManagementService.updateUser(data).subscribe();
      } else {
        this.userManagementService.createUser({ ...data });
      }
      userFormRef.resetForm();
      this.userForm.reset();
    }
  }

  trackByUserId(index: number, user: User): string {
    return user.uuid;
  }
}
