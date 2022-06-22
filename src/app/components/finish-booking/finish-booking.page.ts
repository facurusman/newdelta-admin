import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-booking',
  templateUrl: './finish-booking.page.html',
  styleUrls: ['./finish-booking.page.scss'],
})
export class FinishBookingPage implements OnInit {
  isLoading = false;
  patente;
  idReserva;
  constructor(
    private bookingService: BookingsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPatenteBookingData().then((res) => {
      this.patente = res.value;
    });
    this.bookingService.getIdStorage().then((res) => {
      this.idReserva = res.value;
    });
  }

  goToReservasPage() {
    const id = +this.idReserva;
    this.bookingService
      .aceptBooking(this.patente, id)
      .subscribe((response) => {
        Storage.remove({
          key: 'idReserva',
        });
        this.router.navigateByUrl('/reservas');
      });
  }

  getPatenteBookingData() {
    const patente = Storage.get({
      key: 'patente',
    });
    return patente;
  }
}
