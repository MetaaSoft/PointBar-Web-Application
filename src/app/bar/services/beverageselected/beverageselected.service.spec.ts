import { TestBed } from '@angular/core/testing';

import { BeverageselectedService } from './beverageselected.service';

describe('BeverageselectedService', () => {
  let service: BeverageselectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeverageselectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
