import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../../../services/data/user/user-management.service';
import { AuthManagementService } from '../../../../core/core.module';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'aula-planeta-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContrasenaComponent implements OnInit, OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  form: FormGroup;

  constructor(
    public userManagementService: UserManagementService,
    private fb: FormBuilder,
    public authManagementService: AuthManagementService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      repeatNewPassword: ['', [Validators.required, Validators.minLength(6)]],

    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(frm: FormGroup) {
    const error = frm.controls['newPassword'].value === frm.controls['repeatNewPassword'].value ? null : { 'mismatch': true };
    frm.controls['repeatNewPassword'].setErrors(error);
    return error;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      const tutor = this.form.getRawValue();
      this.authManagementService.changePassword(this.authManagementService.currentUser, tutor)
        .pipe(
          take(1),
          takeUntil(this.destroy$)
        ).
        subscribe();
    }
  }

}