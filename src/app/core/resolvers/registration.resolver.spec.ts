import { TestBed } from '@angular/core/testing';

import { RegistrationResolver } from './registration.resolver';

describe('RegistrationResolver', () => {
  let resolver: RegistrationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RegistrationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
