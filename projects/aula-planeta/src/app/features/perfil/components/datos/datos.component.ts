import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthManagementService, ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { UserManagementService } from '../../../../services/data/user/user-management.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Role } from '../../../../shared/models/role.model';
import { User } from '../../../../shared/models/user.model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'
import { PerfilService } from '../../services/perfil.service';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'aula-planeta-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosComponent implements OnInit, OnDestroy {

  environment = environment;

  file;
  img = '';
  fileObj = '';
  msg: string;
  progress: number = 0;


  private destroy$: Subject<void> = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  form: FormGroup;
  isEdit$: Observable<{ value: boolean }>;
  role: Role;

  constructor(
    public userManagementService: UserManagementService,
    public perfilService: PerfilService,
    private fb: FormBuilder,
    public authManagementService: AuthManagementService
  ) { }


  ngOnInit() {
    this.form = this.fb.group({
      uuid: '',
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', []],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      role: [[], [Validators.required]],
      terminos: [false, [Validators.required]],
      img: ['']
    });

    this.authManagementService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      currentUser => {
        if (currentUser) {
          const roles = currentUser.role.map(role => role._id);
          this.img = (currentUser.google) ? currentUser.img : `${environment.apiUrl}/upload/user/${currentUser.img}`;
          this.form.patchValue({ ...currentUser, img: this.img, role: roles });
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.form.valid) {
      const data = this.form.getRawValue();
      delete data.terminos;
      data.img = this.file;
      this.perfilService.updateCurrentUser(data);
    }
  }

  trackByUserId(index: number, user: User): string {
    return user.uuid;
  }

  onDrop(e) {

    this.file = (e as HTMLInputElement);
    const url = URL.createObjectURL(this.file);

    // Set files form control
    this.form.patchValue({
      img: url
    })

    this.form.get('img').updateValueAndValidity()

  }

}


