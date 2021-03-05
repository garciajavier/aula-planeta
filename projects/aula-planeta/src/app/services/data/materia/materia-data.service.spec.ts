import { TestBed } from '@angular/core/testing';

import { MateriaDataService } from './materia-data.service';


describe('MateriaDataService', () => {
  let service: MateriaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
