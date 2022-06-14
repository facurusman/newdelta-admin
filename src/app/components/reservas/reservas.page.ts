import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToBookingAceptPage() {
    this.router.navigateByUrl('booking-acept');
  }

}

