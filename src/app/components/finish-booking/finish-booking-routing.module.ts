import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishBookingPage } from './finish-booking.page';

const routes: Routes = [
  {
    path: '',
    component: FinishBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishBookingPageRoutingModule {}
