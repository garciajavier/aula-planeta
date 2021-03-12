import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateNewThemeComponent } from '../../../shared/dialogs/create-new-theme/create-new-theme.component';

@Component({
  selector: 'aula-planeta-dialogs',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogContainerComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateNewThemeComponent, {
      width: '250px',
      data: { text: 'HOLA' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
