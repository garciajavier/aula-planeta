import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aula-planeta-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
