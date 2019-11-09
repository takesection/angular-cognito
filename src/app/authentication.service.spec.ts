import { TestBed } from '@angular/core/testing';

import { AuthenticatioService } from './authenticatio.service';

describe('AuthenticatioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticatioService = TestBed.get(AuthenticatioService);
    expect(service).toBeTruthy();
  });
});
