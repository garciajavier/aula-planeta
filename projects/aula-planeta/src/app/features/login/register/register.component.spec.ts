
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from './../../../material/material.module';
import { RegisterComponent } from './register.component';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call register', () => {
    console.log(component.loading);
    component.registerForm.setValue({
      username: 'JOHNY',
      password: '111111',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['ADMIN']
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeTruthy();
  });

  it('should call login and gohome', () => {
    console.log(component.loading);
    component.registerForm.setValue({
      username: 'JOHNY',
      password: '',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['ADMIN']
    });
    fixture.detectChanges();
    component.onSubmit();
    expect(component.registerForm.valid).toBeFalsy();
  });

});
