import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from '../../../services/bookings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  isLoading = false;
  idReserva;
  isChoferAsignada = false;
  patente: string;
  password: string;
  isAuthenticated;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.autoAuthUser();
    if (this.isAuthenticated === undefined) {
      this.router.navigateByUrl('login');
    }else{
      if (this.isAuthenticated) {
        this.isAuthenticated.token.then((token) =>{
          this.isAuthenticated.patente.then((patente) =>{
            this.bookingService.bookingAsignada(patente.value).subscribe((response) =>{
              if (response[0].estado === '1' && response[0].auto === patente.value && token) {
                this.router.navigateByUrl('/finish-booking');
              }
            });
          });
        });
      }else{
        return;
      }
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  goToBookingsPage(patente: string) {
    this.loadingCtrl.create({ message: 'Ingresando...' }).then((loadingEl) => {
      loadingEl.present();
      setTimeout(() => {
        loadingEl.dismiss();
      }, 1000);
      this.bookingService.getIdStorage().then((res) =>{
        this.idReserva = res.value;
        this.bookingService.bookingAsignada(patente).subscribe((response) =>{
          if (response[0].estado === '1' && response[0].auto === patente) {
            this.isChoferAsignada = true;
            this.router.navigateByUrl('/finish-booking');
          }else{
            this.router.navigateByUrl('reservas');
          }
        });
        this.router.navigateByUrl('reservas');
      });
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
    this.goToBookingsPage(patente);
  }
}
