import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import { Storage } from '@capacitor/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-finish-booking',
  templateUrl: './finish-booking.page.html',
  styleUrls: ['./finish-booking.page.scss'],
})
export class FinishBookingPage implements OnInit, ViewWillLeave {
  isLoading = false;
  patente;
  idReserva;
  constructor(
    private bookingService: BookingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.idReserva = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getPatenteBookingData().then((res) => {
      this.patente = res.value;
    });
    // this.bookingService.getIdStorage().then((res) => {
    //   this.idReserva = res.value;
    // });
  }

  goToReservasPage() {
    const idReserva = this.idReserva;
    this.bookingService.aceptBooking(idReserva).subscribe((response) => {
      console.log(response);
      Storage.remove({
        key: 'idReserva',
      });
      this.router.navigateByUrl('/reservas');
    });
  }

  ionViewWillLeave() {
      location.reload();
  }
  getPatenteBookingData() {
    const patente = Storage.get({
      key: 'patente',
    });
    return patente;
  }
}
