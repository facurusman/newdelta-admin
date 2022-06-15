import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  isLoading = false;

  patente: string;
  password: string;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  goToBookingsPage() {
    this.loadingCtrl.create({ message: 'Ingresando...' }).then((loadingEl) => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('reservas');
      }, 1000);
    });
  }

  onForgotPassword() {}

  getToken() {
    return this.authService.getToken();
  }
  getAuthStatusListener() {
    return this.authService.getAuthStatusListener();
  }
  getIsAuth() {
    return this.authService.isAuthenticated;
  }
  onLogout() {
    return this.authService.logout();
  }

  onLogin(patente: string, password: string) {
    this.authService.postLogin(patente, password);
    this.goToBookingsPage();
  }
}
