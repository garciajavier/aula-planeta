import { DataService } from './../../../services/data-service.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '@/core/services/authentication.service';
import { UserService } from '@/services/user.service';
import { Subject } from 'rxjs';
import { Role } from '@/core/models/role.model';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  /**
   * Use to destroy and prevent memory leaks
   */
  private destroy$: Subject<void> = new Subject<void>();

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public authenticationService: AuthenticationService,
    private dataService: DataService
  ) {
    // redirect to starship if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.dataService.get('user-roles').pipe(takeUntil(this.destroy$)).subscribe((roles: Role[]) => {
      this.authenticationService.setRoles = roles;
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      roles: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Submit registration
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(
        take(1),
        takeUntil(this.destroy$))
      .subscribe(() => {
        this.snackBar.open('Registro completado', 'OK', {
          duration: 2000
        });
        this.router.navigate(['/']);
      });
  }
}
