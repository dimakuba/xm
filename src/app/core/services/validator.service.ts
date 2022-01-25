import { Injectable } from '@angular/core';
import { RegistrationFormConfig } from '../models/registration';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  validate(registrationFormConfig: RegistrationFormConfig): boolean {
    return true;
  }
}
