import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationFormConfig } from '../models/registration';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService {
  private readonly baseUrl = '/api';

  constructor(private httpClient: HttpClient) {}

  fetchRegistrationFormConfig(): Observable<RegistrationFormConfig> {
    return this.httpClient.get<RegistrationFormConfig>(
      `${this.baseUrl}/registration-form-config`,
    );
  }
}
