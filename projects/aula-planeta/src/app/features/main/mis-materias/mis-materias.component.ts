import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Materia } from '../../../shared/models/materia.model';
import { AuthManagementService } from '../../../core/auth/auth-management.service';
import { MateriaManagementService } from '../../../services/data/materia/materia-management.service';

@Component({
  selector: 'aula-planeta-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisMateriasComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    public authManagementService: AuthManagementService,
    public materiaManagementService: MateriaManagementService
  ) { }

  ngOnInit() { }

}
