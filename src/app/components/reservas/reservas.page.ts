import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Reserva } from 'src/app/models/reserva';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  reservas: Reserva[];
  constructor(
    private router: Router,
    private bookingService: BookingsService
  ) {}

  ngOnInit() {
    this.allBookings()
  }
  allBookings() {
    return this.bookingService.getBookings().subscribe((bookings) => {
      this.reservas = bookings as Reserva[];
      console.log(this.reservas);
      
    })
  }
  goToBookingAceptPage(id: number) {
    return this.bookingService.aceptBooking(id).subscribe(() => {
      this.router.navigateByUrl('booking-acept');
    })
  }
}
