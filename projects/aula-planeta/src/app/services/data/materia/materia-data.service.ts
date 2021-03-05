import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LocalCacheService } from '../../../core/load-cache/load-cache.service';
import { Materia } from '../../../shared/models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaDataService {

  constructor(private http: HttpClient, public cache: LocalCacheService) { }

  public getMaterias(): Observable<any> {
    let requestObservable = this.http.get<any>(`${environment.apiUrl}/materias`);
    return this.cache.observable('MATERIADATASERVICE-GETMATERIAS', requestObservable);
  }

  public createMateria(materia: Materia): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/materias/register`, materia);
  }
  public updateMateria(materia: Materia): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/materias/${materia._id}`, materia);
  }
  public deleteMateria(materia: Materia): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/Materias/${materia._id}`);
  }
}
