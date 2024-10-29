import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AzzoDecodedToken, AzzoLogin, AzzoTokens } from '../models/login.model';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { AzzoService } from 'src/app/modules/services/azzo.service';
import { decodeJwt } from '../../../shared/decodeJwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'STORAGE_TOKEN';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly azzoService: AzzoService,
  ) {}

  async login(data: AzzoLogin): Promise<any> {
    try {
      this.azzoService.login(data).subscribe({
        next: (tokens: AzzoTokens) => {
          // Usa a função `decodeJwt` para decodificar o token manualmente
          console.log('Access Token encontrado==>', tokens.accessToken);
          const decodedToken = decodeJwt(tokens.accessToken);
          const cargo = decodedToken ? decodedToken.cargo : null;

          // Armazena o token no localStorage
          this.localStorageService.set(this.tokenKey, tokens.accessToken);
        },
      });
    } catch (error) {
      this.logOut();

      throw error;
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authStatus.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  logOut(): void {
    this.localStorageService.remove(this.tokenKey);
    this.authStatus.next(false);
  }
}


