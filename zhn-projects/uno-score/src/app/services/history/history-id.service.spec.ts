import { TestBed } from '@angular/core/testing';

import { HistoryIdService } from './history-id.service';

describe('HistoryIdService', () => {
  let service: HistoryIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
