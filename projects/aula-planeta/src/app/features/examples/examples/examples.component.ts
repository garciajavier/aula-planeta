import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'aula-planeta-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'aula-planeta.examples.menu.todos' },
    { link: 'stock-market', label: 'aula-planeta.examples.menu.stocks' },
    { link: 'theming', label: 'aula-planeta.examples.menu.theming' },
    { link: 'crud', label: 'aula-planeta.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'aula-planeta.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'aula-planeta.examples.menu.form' },
    { link: 'notifications', label: 'aula-planeta.examples.menu.notifications' },
    { link: 'elements', label: 'aula-planeta.examples.menu.elements' },
    { link: 'authenticated', label: 'aula-planeta.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
