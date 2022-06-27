import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewWillEnter, ViewWillLeave } from '@ionic/angular';

@Component({
  selector: 'app-booking-acept',
  templateUrl: './booking-acept.page.html',
  styleUrls: ['./booking-acept.page.scss'],
})
export class BookingAceptPage implements OnInit, ViewWillEnter {
  id: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    console.log(this.id);
  }
  // ionViewWillLeave(){
  //   location.reload();
  // }
  ionViewWillEnter() {
    setTimeout(() => {
      console.log(this.id);
      const id = this.id;
      this.router.navigateByUrl(`/finish-booking/${id}`);
    }, 5000);
  }

}
