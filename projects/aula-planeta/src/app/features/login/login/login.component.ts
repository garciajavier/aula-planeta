import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthManagementService } from '../../../core/auth/auth-management.service';
import { SocialAuthService, MicrosoftLoginProvider, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
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
    private authenticationService: AuthManagementService,
    private authService: SocialAuthService
  ) {
    // redirect to starship if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
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
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Submit login
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .authLogin(this.f.email.value, this.f.password.value)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  socialLogin(name: string) {
    switch (name) {
      case 'google':
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(userGoogle => {
          this.authenticationService
            .authLoginGoogle(userGoogle.idToken)
            .pipe(take(1), takeUntil(this.destroy$))
            .subscribe(() => {
              this.router.navigateByUrl('/');
            });
        });

        break;
      case 'microsoft':
        this.authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
        break;
      default:
        this.onSubmit();
        break;
    }
  }


  register() {
    this.router.navigateByUrl('/login/register');
  }
}
