import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from './numbers-only/numbers-only.directive';
import { UppercaseDirective } from './uppercase/uppercase.directive';
import { PermissionDirective } from './permission/permission.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumbersOnlyDirective,
    UppercaseDirective,
    PermissionDirective
  ],
  exports: [
    NumbersOnlyDirective,
    UppercaseDirective,
    PermissionDirective
  ]
})
export class DirectivesModule { }
