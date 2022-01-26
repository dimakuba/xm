import { Injectable } from '@angular/core';
import {
  FieldValidation,
  RegistrationField,
  RegistrationFormConfig,
} from '../models/registration';
import { validate } from 'class-validator';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  validate(
    registrationFormConfig: RegistrationFormConfig,
  ): Observable<boolean> {
    return from(
      Promise.all([
        ...registrationFormConfig.map((field) => validate(field)),
        ...registrationFormConfig
          .reduce(
            (acc: FieldValidation[], f: RegistrationField) => [
              ...acc,
              ...(f.validations ?? []),
            ],
            [],
          )
          .map((field) => validate(field)),
      ]),
    ).pipe(map((errors) => errors.every((list) => list.length === 0)));
  }
}
