import { TestBed } from '@angular/core/testing';

import { SalesHistoryService } from './salesHistory.service';

describe('SaleshistoryService', () => {
  let service: SalesHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
