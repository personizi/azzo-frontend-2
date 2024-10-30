import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AzzoLogin, AzzoTokens } from '../auth/models/login.model';


@Injectable()

export class AzzoService {
    private baseUrl: string;
  constructor( private readonly http: HttpClient ) {
    this.baseUrl = 'http://localhost:3000/auth';
  }

  login(login: AzzoLogin) {
    return this.http.post<AzzoTokens>(`${this.baseUrl}/login`, login);
  }
  
}