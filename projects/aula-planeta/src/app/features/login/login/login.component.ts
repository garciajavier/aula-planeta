import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '@/core/services/authentication.service';
import { Subject } from 'rxjs';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit, OnDestroy {

  /**
   * Use to destroy and prevent memory leaks
   */
  private destroy$: Subject<void> = new Subject<void>();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to starship if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    const key = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams[key] || '/';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Submit login
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(take(1),
        takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        });
  }
}
