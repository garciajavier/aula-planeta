
import { Injectable } from '@angular/core';
import { AuthManagementService } from '../../../core/core.module';
import { UserManagementService } from '../../../services/data/user/user-management.service';
import { User } from '../../../shared/models/user.model';
import { Tutor } from '../../../shared/models/tutor.model';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { OnDestroy } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class PerfilService implements OnDestroy {

  constructor(
    private userManagementServiceUser: UserManagementService,
    private authManagementService: AuthManagementService
  ) { }

  private destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateTutorUser(user: User, tutor: Tutor) {
    this.userManagementServiceUser.updateTutorUser(user, tutor)
      .pipe(
        take(1),
        takeUntil(this.destroy$))
      .subscribe();
  }

  activarCodigo(codigo: string) {
    // this.userservicio.activarCodigo(codigo)
    //   .pipe(
    //     take(1),
    //     takeUntil(this.destroy$))
    //   .subscribe();
  }

  vincularCuenta(plataforma: string) {
    // this.userservicio.vincularCuenta(plataforma)
    //   .pipe(
    //     take(1),
    //     takeUntil(this.destroy$))
    //   .subscribe();
  }

  updateDatosCurrentUser(user: User) {
    if (this.authManagementService.currentUser.google) {
      this.userManagementServiceUser.updateUser(user)
        .pipe(
          take(1),
          takeUntil(this.destroy$))
        .subscribe(
          user => {
            this.authManagementService.refreshToken()
              .pipe(
                take(1),
                takeUntil(this.destroy$))
              .subscribe();
          }
        );
    } else {

      if (user.img) {
        this.userManagementServiceUser.uploadImgUser(user, user.img)
          .pipe(
            take(1),
            takeUntil(this.destroy$)
          )
          .subscribe(res => {
            user.img = res.nombreArchivo;
            this.userManagementServiceUser.updateUser(user)
              .pipe(
                take(1),
                takeUntil(this.destroy$)
              )
              .subscribe(
                user => {
                  this.authManagementService.refreshToken()
                    .pipe(
                      take(1),
                      takeUntil(this.destroy$)
                    )
                    .subscribe();
                }
              );
          })
      } else {
        this.userManagementServiceUser.updateUser(user)
          .pipe(
            take(1),
            takeUntil(this.destroy$)
          )
          .subscribe(
            user => {
              this.authManagementService.refreshToken()
                .pipe(
                  take(1),
                  takeUntil(this.destroy$)
                )
                .subscribe();
            }
          );

      }

    }
  }
}
