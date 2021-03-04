import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/animations/route.animations';
import { Materia } from '../../../shared/models/materia.model';
import { AuthManagementService } from '../../../core/auth/auth-management.service';

@Component({
  selector: 'aula-planeta-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MisMateriasComponent implements OnInit {

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(public authManagementService: AuthManagementService) { }

  ngOnInit() { }

  openLink(link: string) {
    window.open(link, '_blank');
  }

  materias: Materia[] = [{
    '_id': {
      '$oid': '603645c226eac51d644a3c8b'
    },
    'nombre': 'Matematicas',
    'curso': '1ºESO',
    'asignatura': 'Matematicas 1º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '6036463226eac51d644a3c8c'
    },
    'nombre': 'Matematicas',
    'curso': '2ºESO',
    'asignatura': 'Matematicas 2º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '6036463726eac51d644a3c8d'
    },
    'nombre': 'Matematicas',
    'curso': '3ºESO',
    'asignatura': 'Matematicas 3º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '6036464326eac51d644a3c8e'
    },
    'nombre': 'Lengua Castellana',
    'curso': '3ºESO',
    'asignatura': 'Lengua Castellana 3º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '6036467026eac51d644a3c8f'
    },
    'nombre': 'Tecnología',
    'curso': '1ºESO',
    'asignatura': 'Tecnología 1º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364a8957bf633f2c0fcfbf'
    },
    'nombre': 'Tecnología',
    'curso': '3ºESO',
    'asignatura': 'Tecnología 3º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364aa057bf633f2c0fcfc0'
    },
    'nombre': 'Ciencias sociales',
    'curso': '1ºESO',
    'asignatura': 'Ciencias sociales 1º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364aa457bf633f2c0fcfc1'
    },
    'nombre': 'Ciencias sociales',
    'curso': '2ºESO',
    'asignatura': 'Ciencias sociales 2º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364ab857bf633f2c0fcfc2'
    },
    'nombre': 'Ciencias sociales',
    'curso': '3ºESO',
    'asignatura': 'Ciencias sociales 3º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364ac157bf633f2c0fcfc3'
    },
    'nombre': 'Ciencias Naturales',
    'curso': '3ºESO',
    'asignatura': 'Ciencias Naturales 3º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364ac657bf633f2c0fcfc4'
    },
    'nombre': 'Ciencias Naturales',
    'curso': '2ºESO',
    'asignatura': 'Ciencias Naturales 2º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }, {
    '_id': {
      '$oid': '60364aca57bf633f2c0fcfc5'
    },
    'nombre': 'Ciencias Naturales',
    'curso': '1ºESO',
    'asignatura': 'Ciencias Naturales 1º',
    'norma': 'ESO',
    'organizacion': 'organizacion X',
    '__v': 0
  }]

}
