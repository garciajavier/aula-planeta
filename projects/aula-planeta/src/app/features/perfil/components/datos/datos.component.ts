import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aula-planeta-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
