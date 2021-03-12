import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'aula-planeta-create-new-theme',
  templateUrl: 'create-new-theme.component.html'
})
export class CreateNewThemeComponent {
  constructor(public dialogRef: MatDialogRef<CreateNewThemeComponent>, @Inject(MAT_DIALOG_DATA) public data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}