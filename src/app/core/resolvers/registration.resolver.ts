import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { RegistrationApiService } from '../services/registration-api.service';
import { RegistrationFormConfig } from '../models/registration';
import { ErrorHandler } from '../services/error-handler.service';
import { ValidatorService } from '../services/validator.service';

export interface RegistrationResolverOutput {
  isRegistrationFormConfigValid: boolean;
  registrationFieldList: RegistrationFormConfig;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationResolver
  implements Resolve<RegistrationResolverOutput>
{
  constructor(
    private registrationApiService: RegistrationApiService,
    private errorHandler: ErrorHandler,
    private validatorService: ValidatorService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<RegistrationResolverOutput> {
    return this.registrationApiService.fetchRegistrationFormConfig().pipe(
      map(
        (registrationFieldList) =>
          ({
            isRegistrationFormConfigValid: this.validatorService.validate(
              registrationFieldList,
            ),
            registrationFieldList,
          } as RegistrationResolverOutput),
      ),
      catchError((e) => {
        this.errorHandler.handle(e);

        return of({
          isRegistrationFormConfigValid: false,
          registrationFieldList: [],
        } as RegistrationResolverOutput);
      }),
    );
  }
}
