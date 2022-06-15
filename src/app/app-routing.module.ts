import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './components/auth/login/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/auth/login/login.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./components/reservas/reservas.module').then(
        (m) => m.ReservasPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'booking-acept',
    loadChildren: () =>
      import('./components/booking-acept/booking-acept.module').then(
        (m) => m.BookingAceptPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
