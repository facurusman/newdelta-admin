import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Reserva } from '../models/reserva';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private readonly http: HttpClient) {}

  getBookings() {
    return this.http.post(`${environment.apiBookings}/activas`, []);
  }
  aceptBooking(patente: string, idReserva: number) {
    console.log(patente, +idReserva);
    return this.http.post(`${environment.apiBookings}/completar`, {
      patente,
      idReserva,
    });
  }

  getIdStorage(){
    return this.getBookingData();
  }

  asignarBooking(id: number, auto: string) {
    this.saveBookingData(id);
    return this.http.post(`${environment.apiBookings}/asignar/${id}`, { auto });
  }

  bookingAsignada(patente: string){
    return this.http.post(`${environment.apiBookings}/asignada`, { patente });
  }

  private saveBookingData(idReserva: any) {
    Storage.set({
      key: 'idReserva',
      value: idReserva,
    });
  }

  private getBookingData() {
    const idReserva = Storage.get({
      key: 'idReserva',
    });
    return idReserva;
  }
}
