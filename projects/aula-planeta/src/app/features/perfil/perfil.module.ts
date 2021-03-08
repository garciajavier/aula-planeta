import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { SettingsComponent } from './components/settings/settings.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { UserComponent } from './components/users/user.component';
import { DatosComponent } from './components/datos/datos.component';
import { TutoresComponent } from './components/tutores/tutores.component';
import { ContrasenaComponent } from './components/contrasena/contrasena.component';
import { ActivacionComponent } from './components/activacion/activacion.component';
import { VincularComponent } from './components/vincular/vincular.component';
import { UserManagementService } from '../../services/data/user/user-management.service';
import { DirectivesModule } from '../../core/directives/directives.module';
import { PerfilService } from './services/perfil.service';
import { SafePipe } from '../../core/safe/safe.service';

@NgModule({
  declarations: [SettingsComponent, PerfilComponent, UserComponent, DatosComponent, TutoresComponent, ContrasenaComponent, ActivacionComponent, VincularComponent, SafePipe],
  imports: [CommonModule, SharedModule, PerfilRoutingModule, MaterialModule, DirectivesModule],
  providers: [UserManagementService, PerfilService]
})
export class PerfilModule { }
