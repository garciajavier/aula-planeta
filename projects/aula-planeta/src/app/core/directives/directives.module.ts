import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from './numbers-only/numbers-only.directive';
import { UppercaseDirective } from './uppercase/uppercase.directive';
import { PermissionDirective } from './permission/permission.directive';
import { DropZoneDirective } from './dropZone/drop-zone.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumbersOnlyDirective,
    UppercaseDirective,
    PermissionDirective,
    DropZoneDirective,
  ],
  exports: [
    NumbersOnlyDirective,
    UppercaseDirective,
    DropZoneDirective,
    PermissionDirective
  ]
})
export class DirectivesModule { }
