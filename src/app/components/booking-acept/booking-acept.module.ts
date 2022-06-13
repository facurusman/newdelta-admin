import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingAceptPageRoutingModule } from './booking-acept-routing.module';

import { BookingAceptPage } from './booking-acept.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingAceptPageRoutingModule
  ],
  declarations: [BookingAceptPage]
})
export class BookingAceptPageModule {}
