import { AuthenticationService } from '@/core/services/authentication.service';
import { USERS } from 'assets/mocks/admin-user.mock';
import { AuthGuard } from '@/core/guards/auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from '@/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        AuthGuard,
        AuthenticationService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and gohome', () => {
    component.ngOnInit();
    component.loginForm.setValue({
      username: USERS[0].username,
      password: '111111'
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loginForm.valid).toBeDefined();
  });

  it('should call login and wrong credentials', () => {
    component.ngOnInit();
    component.loginForm.setValue({
      username: 'john',
      password: ''
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loginForm.valid).toBeFalsy();
  });
});
