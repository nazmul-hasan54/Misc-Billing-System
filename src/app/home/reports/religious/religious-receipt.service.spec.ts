import { TestBed } from '@angular/core/testing';

import { ReligiousReceiptService } from './religious-receipt.service';

describe('ReligiousReceiptService', () => {
  let service: ReligiousReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReligiousReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
