import { C } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { AuthManagementService } from '../../../core/core.module';
import { UserManagementService } from '../../../services/data/user/user-management.service';
import { User } from '../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(
    private userManagementServiceUser: UserManagementService,
    private authManagementService: AuthManagementService
  ) {
  }

  updateCurrentUser(user: User) {
    if (this.authManagementService.currentUser.google) {
      this.userManagementServiceUser.updateUser(user).subscribe(
        user => {
          this.authManagementService.refreshToken().subscribe();
        }
      );
    } else {

      if (user.img) {
        this.userManagementServiceUser.uploadImgUser(user, user.img).subscribe(res => {
          user.img = res.nombreArchivo;
          this.userManagementServiceUser.updateUser(user).subscribe(
            user => {
              this.authManagementService.refreshToken().subscribe();
            }
          );
        })
      } else {
        this.userManagementServiceUser.updateUser(user).subscribe(
          user => {
            this.authManagementService.refreshToken().subscribe();
          }
        );

      }

    }
  }
}
