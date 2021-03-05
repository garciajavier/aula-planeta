import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aula-planeta-activacion',
  templateUrl: './activacion.component.html',
  styleUrls: ['./activacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
