import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aula-planeta-vincular',
  templateUrl: './vincular.component.html',
  styleUrls: ['./vincular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VincularComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
