import { TestBed } from '@angular/core/testing';

import {
  RegistrationResolver,
  RegistrationResolverOutput,
} from './registration.resolver';
import { CoreModule } from '../core.module';
import { ValidatorService } from '../services/validator.service';
import { Observable, of } from 'rxjs';
import {
  RegistrationField,
  RegistrationFormConfig,
} from '../models/registration';
import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE } from '../interceptors/stub-response';

@Injectable()
class ValidatorServiceMock extends ValidatorService {
  override validate(
    registrationFormConfig: RegistrationFormConfig,
  ): Observable<boolean> {
    return of(true);
  }
}

describe('RegistrationResolver', () => {
  let resolver: RegistrationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientModule],
      providers: [
        ValidatorServiceMock,
        {
          provide: ValidatorService,
          useClass: ValidatorServiceMock,
        },
      ],
    });
    resolver = TestBed.inject(RegistrationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  describe('resolve', () => {
    it('should resolve valid data', () => {
      const expected: RegistrationResolverOutput = {
        isRegistrationFormConfigValid: true,
        registrationFieldList: REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE.map(
          (f) => new RegistrationField(f),
        ),
      };

      resolver.resolve().subscribe((data: RegistrationResolverOutput) => {
        expect(data).toEqual(expected);
      });
    });
  });
});
