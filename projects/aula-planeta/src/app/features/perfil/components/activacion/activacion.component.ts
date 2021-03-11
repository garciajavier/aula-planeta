import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { UserManagementService } from '../../../../services/data/user/user-management.service';
import { PerfilService } from '../../services/perfil.service';
import { AuthManagementService } from '../../../../core/core.module';

@Component({
  selector: 'aula-planeta-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: ['./activacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivacionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  form: FormGroup;

  constructor(
    public userManagementService: UserManagementService,
    public perfilService: PerfilService,
    private fb: FormBuilder,
    public authManagementService: AuthManagementService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onSubmit() {
    if (this.form.valid) {
      const tutor = this.form.getRawValue();
      // this.authManagementService.changePassword(this.authManagementService.currentUser, tutor)
      //   .pipe(
      //     take(1),
      //     takeUntil(this.destroy$)
      //   ).
      //   subscribe();
    }
  }

}
