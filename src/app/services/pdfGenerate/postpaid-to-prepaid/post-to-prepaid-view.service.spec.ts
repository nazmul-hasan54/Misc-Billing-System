import { TestBed } from '@angular/core/testing';

import { PostToPrepaidViewService } from './post-to-prepaid-view.service';

describe('PostToPrepaidViewService', () => {
  let service: PostToPrepaidViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostToPrepaidViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
