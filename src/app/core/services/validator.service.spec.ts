import { fakeAsync, TestBed } from '@angular/core/testing';

import { ValidatorService } from './validator.service';
import { RegistrationField } from '../models/registration';
import { REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE } from '../interceptors/stub-response';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be valid', fakeAsync(() => {
    const data = REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE.map(
      (f) => new RegistrationField(f),
    );

    service.validate(data).subscribe((isValid) => {
      expect(isValid).toBeTruthy();
    });
  }));

  it('should be invalid', fakeAsync(() => {
    const data = REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE.map(
      (f) => new RegistrationField(f),
    );
    const [formField] = data;
    formField.type = 1 as any;

    service.validate([formField]).subscribe((isValid) => {
      expect(isValid).toBeFalsy();
    });
  }));
});
