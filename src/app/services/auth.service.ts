import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../models/AuthData';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  private token: any;
  private patente: any;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private expirationDate;
  private expirationData: any;
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  postLogin(patente: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number }>(
        `${environment.apiUsers}/loginChoferes`,
        { patente, password }
      )
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate, patente);
        } else {
          this.authStatusListener.next(false);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const information = authInformation.expirationDate
    .then((res) => new Date(Date.parse(res.value)).getTime() - new Date().getTime());
    const printValue = async () => {
      const v = await information;
      if (v > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.setAuthTimer(v / 1000);
        this.authStatusListener.next(true);
        return this.isAuthenticated;
      }
    };
    printValue();
  }

  logout() {
    this.token = null;
    this.patente = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigateByUrl('');
  }
  getPatente() {
    return this.getAuthData();
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, patente: string) {
    Storage.set({
      key: 'token',
      value: token,
    });
    Storage.set({
      key: 'expiration',
      value: expirationDate.toISOString(),
    });
    Storage.set({
      key: 'patente',
      value: patente,
    });
  }

  private clearAuthData() {
    Storage.remove({
      key: 'token',
    });
    Storage.remove({
      key: 'expiration',
    });
    Storage.remove({
      key: 'patente',
    });
  }

  private getAuthData() {
    const token = Storage.get({
      key: 'token',
    });
    this.expirationDate = Storage.get({
      key: 'expiration',
    });
    const patente = Storage.get({
      key: 'patente',
    });
    if (!token || !this.expirationDate || !patente) {
      return;
    }
    return {
      token,
      expirationDate: this.expirationDate,
      patente,
    };
  }
}
