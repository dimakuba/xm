import { TestBed } from '@angular/core/testing';

import { RegistrationApiStubInterceptor } from './registration-api-stub.interceptor';

describe('RegistrationApiStubInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [RegistrationApiStubInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: RegistrationApiStubInterceptor = TestBed.inject(
      RegistrationApiStubInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
