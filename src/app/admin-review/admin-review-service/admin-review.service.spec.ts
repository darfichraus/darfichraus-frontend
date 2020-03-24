import { TestBed } from '@angular/core/testing';

import { AdminReviewService } from './admin-review.service';

describe('AdminReviewService', () => {
  let service: AdminReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
