import { TestBed } from '@angular/core/testing';

import { SelfcareService } from './selfcare.service';

describe('SelfcareService', () => {
  const service: SelfcareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelfcareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
