import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AzzoDecodedToken, AzzoLogin, AzzoTokens, Cargo } from '../models/login.model';
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

  async login(data: AzzoLogin): Promise<Cargo> {
    try {
      this.localStorageService.remove(this.tokenKey);

      const tokens = await firstValueFrom(this.azzoService.login(data));

      // Armazena o token no localStorage
      this.localStorageService.set(this.tokenKey, tokens.accessToken);
      this.authStatus.next(true);  // Atualiza o estado de autenticação
      
      // Decodifica o token para obter o cargo
      const decodedToken = decodeJwt(tokens.accessToken);
      console.log('CARGO =====>>>>', decodedToken.cargo);
      
      return decodedToken.cargo;
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


