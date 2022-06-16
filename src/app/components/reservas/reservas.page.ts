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
  isAsignada = false;
  isChoferAsignada = false;
  idReserva;

  constructor(
    private router: Router,
    private bookingService: BookingsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.allBookings();
    this.getPatente().patente.then((res) => {
      this.patente = res.value;
      this.bookingService.getIdStorage().then((resEl) =>{
        this.idReserva = resEl.value;
        if (this.idReserva) {
          this.isChoferAsignada = true;
          this.router.navigateByUrl('/finish-booking');
        }else{
          this.bookingService.bookingAsignada(res.value).subscribe((response) =>{
            if (response[0] === undefined) {
              this.router.navigateByUrl('reservas');
            }else{
              this.router.navigateByUrl('/finish-booking');
            }
          });
        }
      });
    });;
  }
  allBookings() {
    return this.bookingService.getBookings().subscribe((bookings) => {
      this.reservas = bookings as Reserva[];
    });
  }
  goToBookingAceptPage(id: number) {
    this.loadingCtrl.create({ message: 'Asignando...' }).then((loadingEl) => {
      loadingEl.present();
      this.bookingService
        .asignarBooking(id, this.patente)
        .subscribe((response) => {
          if (response.hasOwnProperty('status')) {
            loadingEl.dismiss();
            this.router.navigateByUrl('booking-acept');
          } else {
            this.router.navigateByUrl('reservas');
          }
        });
    });
  }
  getPatente() {
    return this.authService.getPatente();
  }
}
