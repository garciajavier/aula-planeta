import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';
import { FormGroup } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';


@Component({
  selector: 'aula-planeta-vincular',
  templateUrl: './vincular.component.html',
  styleUrls: ['./vincular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VincularComponent implements OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private perfilService: PerfilService
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  vincular(plataforma) {
    this.perfilService.vincularCuenta(plataforma);
  }
}


