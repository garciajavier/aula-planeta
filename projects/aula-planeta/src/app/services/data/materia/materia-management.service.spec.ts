import { TestBed } from '@angular/core/testing';

import { MateriaManagementService } from './materia-management.service';

describe('MateriaManagementService', () => {
  let service: MateriaManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
