import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';
import { UserManagementService } from '../../../../services/data/user/user-management.service';
import { AuthManagementService } from '../../../../core/core.module';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../../../shared/models/user.model';
import { Tutor } from '../../../../shared/models/tutor.model';

@Component({
  selector: 'aula-planeta-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutoresComponent implements OnInit, OnDestroy {


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
      uuid: '',
      email: ['', [Validators.required, Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      terminos: [false, [Validators.required]]

    });

    this.authManagementService.currentUser$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      currentUser => {
        if (currentUser) {
          // MOCK
          const tutor = currentUser.tutor ? currentUser.tutor : { email: 'perico@palotes.es', firstName: 'Perico', lastName: 'Palotes' }
          const { email, firstName, lastName } = tutor;
          this.form.patchValue({ email, firstName, lastName });
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
      const tutor = this.form.getRawValue();
      this.perfilService.updateTutorUser(this.authManagementService.currentUser, tutor);
    }
  }

}
