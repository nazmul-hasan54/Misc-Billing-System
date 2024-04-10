import { TestBed } from '@angular/core/testing';

import { UntracedConsumerViewReportService } from './untraced-consumer-view-report.service';

describe('UntracedConsumerViewReportService', () => {
  let service: UntracedConsumerViewReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UntracedConsumerViewReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
