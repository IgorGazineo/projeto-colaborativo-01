import { TestBed } from '@angular/core/testing';

import { ServerActiveService } from './server-active.service';

describe('ServerActiveService', () => {
  let service: ServerActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
