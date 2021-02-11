import { TestBed } from '@angular/core/testing';

import { RouterReuseService } from './router-reuse.service';

describe('RouterReuseService', () => {
  let service: RouterReuseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterReuseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
