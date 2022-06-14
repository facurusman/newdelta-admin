import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  isLoading = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

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

  onForgotPassword(){}
}
