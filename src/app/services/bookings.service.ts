import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Reserva } from '../models/reserva';
@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private readonly http: HttpClient) {}

  getBookings() {
    return this.http.post(`${environment.apiBookings}/activas`, []);
  }
  aceptBooking(patente: string, idReserva: number) {
    return this.http.post(`${environment.apiBookings}/completar`, {
      patente,
      idReserva
    });
  }
}
