import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MisMateriasComponent } from './mis-materias/mis-materias.component';
import { DialogContainerComponent } from './dialogs/dialog-container.component';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [MisMateriasComponent, DialogContainerComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class MainModule { }
