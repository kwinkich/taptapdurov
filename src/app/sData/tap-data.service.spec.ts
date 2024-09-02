import { TestBed } from '@angular/core/testing';

import { TapDataService } from './tap-data.service';

describe('TapDataService', () => {
  let service: TapDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
