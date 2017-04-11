import { TestBed, async, inject } from '@angular/core/testing';

import { DelayGuard } from './delay.guard';

describe('DelayGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DelayGuard]
    });
  });

  it('should ...', inject([DelayGuard], (guard: DelayGuard) => {
    expect(guard).toBeTruthy();
  }));
});
