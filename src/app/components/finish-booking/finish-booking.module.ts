import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishBookingPageRoutingModule } from './finish-booking-routing.module';

import { FinishBookingPage } from './finish-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishBookingPageRoutingModule
  ],
  declarations: [FinishBookingPage]
})
export class FinishBookingPageModule {}
