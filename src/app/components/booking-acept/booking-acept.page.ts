import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-booking-acept',
  templateUrl: './booking-acept.page.html',
  styleUrls: ['./booking-acept.page.scss'],
})
export class BookingAceptPage implements OnInit, ViewWillLeave, ViewWillEnter {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  ionViewWillLeave(){
    location.reload();
  }
  ionViewWillEnter() {
    setTimeout(() => {
      this.router.navigateByUrl('/finish-booking')
    }, 5000);
  }

}
