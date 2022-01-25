import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationApiStubInterceptor } from './interceptors/registration-api-stub.interceptor';

@NgModule({
  providers: [
    RegistrationApiStubInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RegistrationApiStubInterceptor,
      multi: true,
    },
  ],
  imports: [CommonModule],
})
export class CoreModule {}
