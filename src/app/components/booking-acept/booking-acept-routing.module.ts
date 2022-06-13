import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingAceptPage } from './booking-acept.page';

const routes: Routes = [
  {
    path: '',
    component: BookingAceptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingAceptPageRoutingModule {}
