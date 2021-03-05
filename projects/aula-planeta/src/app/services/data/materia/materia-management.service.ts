import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Materia } from '../../../shared/models/materia.model';
import { MateriaDataService } from './materia-data.service';
import { take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriaManagementService implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private _materias: BehaviorSubject<Materia[]> = new BehaviorSubject<Materia[]>([]);
  materias$ = this._materias.asObservable();

  constructor(
    private materiaDataService: MateriaDataService
  ) {
    this.getMaterias();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get materias() {
    return this._materias.getValue();
  }

  getMaterias() {
    this.materiaDataService.getMaterias().pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.materiasNext(res.materias);
        }
      );
  }

  createMateria(materia: Materia) {
    this.materiaDataService.createMateria(materia).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getMaterias();
      });
  }

  updateMateria(materia: Materia) {
    this.materiaDataService.updateMateria(materia).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getMaterias();
      });
  }

  deleteMateria(materia: Materia) {
    this.materiaDataService.deleteMateria(materia).pipe(
      take(1),
      takeUntil(this.destroy$))
      .subscribe(() => {
        this.getMaterias();
      });
  }

  private materiasNext(materias: Materia[]) {
    this._materias.next(materias);
  }
}
