import { TestBed } from '@angular/core/testing';

import { GitIntegrationService } from './git-integration.service';

describe('GitIntegrationService', () => {
  let service: GitIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
