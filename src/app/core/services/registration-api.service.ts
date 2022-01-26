import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  RegistrationField,
  RegistrationFormConfig,
  RegistrationRequest,
} from '../models/registration';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService {
  private readonly baseUrl = '/api';

  constructor(private httpClient: HttpClient) {}

  fetchRegistrationFormConfig(): Observable<RegistrationFormConfig> {
    return this.httpClient
      .get<RegistrationFormConfig>(`${this.baseUrl}/registration-form-config`)
      .pipe(map((res) => res.map((f) => new RegistrationField(f))));
  }

  register(registrationRequest: RegistrationRequest): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseUrl}/signup`,
      registrationRequest,
    );
  }
}
