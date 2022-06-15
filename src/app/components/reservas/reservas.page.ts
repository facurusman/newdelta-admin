import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Reserva } from 'src/app/models/reserva';
import { AuthService } from 'src/app/services/auth.service';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas: Reserva[];
  patente: string;
  isLoading = false;
  constructor(
    private router: Router,
    private bookingService: BookingsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.allBookings();
    this.getPatente();
  }
  allBookings() {
    return this.bookingService.getBookings().subscribe((bookings) => {
      this.reservas = bookings as Reserva[];
    });
  }
  goToBookingAceptPage(id: number) {
    this.loadingCtrl.create({ message: 'Aceptando...' }).then((loadingEl) => {
      loadingEl.present();
      this.bookingService.aceptBooking(this.patente, id).subscribe(() => {
        loadingEl.dismiss();
        this.router.navigateByUrl('booking-acept');
      });
    });
  }
  getPatente(){
    this.authService.getPatente().patente.then((res) =>{
      this.patente = res.value;
    });
  }
}
