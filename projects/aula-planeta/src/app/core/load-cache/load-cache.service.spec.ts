import { TestBed } from '@angular/core/testing';

import { LoadCacheService } from './load-cache.service';

describe('LoadCacheService', () => {
  let service: LoadCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
