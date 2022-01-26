import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE } from './stub-response';

@Injectable()
export class RegistrationApiStubInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/api/registration-form-config')) {
      return of(
        new HttpResponse({
          status: 200,
          body: REGISTRATION_FORM_FIELDS_RESPONSE_EXAMPLE,
        }),
      );
    } else if (request.url.includes('/api/signup')) {
      return of(
        new HttpResponse({
          status: 200,
          body: true,
        }),
      );
    }

    return next.handle(request);
  }
}
