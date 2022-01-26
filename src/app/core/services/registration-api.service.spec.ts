import { TestBed } from '@angular/core/testing';

import { RegistrationApiService } from './registration-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegistrationApiService', () => {
  let service: RegistrationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(RegistrationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
