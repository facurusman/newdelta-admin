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
          this.router.navigateByUrl('/reservas');
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
    const now = new Date();
    const expiresIn =  new Date(Date.parse(authInformation.expirationDate)).getTime() - new Date().getTime();
    if (expiresIn > 0) {
      const token = authInformation.token.then((res) => res.value);
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      return token;
    }
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
  getPatente(){
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
    }).then((res) =>{
      this.expirationData = res.value;
    });
    const patente = Storage.get({
      key: 'patente',
    });
    if (!token || !this.expirationDate || !patente) {
      return;
    }
    return {
      token,
      expirationDate: this.expirationData,
      patente,
    };
  }
}
