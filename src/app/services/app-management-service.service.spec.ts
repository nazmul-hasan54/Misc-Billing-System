import { TestBed } from '@angular/core/testing';

import { AppManagementServiceService } from './app-management-service.service';

describe('AppManagementServiceService', () => {
  let service: AppManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
