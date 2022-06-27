import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Reserva } from '../models/reserva';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  isAsignada = false;
  private token: any;
  private patente: any;
  private tokenTimer: any;
  private expirationDate;
  private expirationData: any;
  constructor(private readonly http: HttpClient, private router: Router) {}

  getBookings() {
    return this.http.post(`${environment.apiBookings}/activas`, []);
  }
  aceptBooking(idReserva: number) {
    console.log(idReserva);
    return this.http.post(`${environment.apiBookings}/completar/${idReserva}`, {});
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

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    if (authInformation.patente) {
      const patente = authInformation.patente.then((res) => res.value);
      const printValue = async () =>{
        this.bookingAsignada(await patente).subscribe((response) =>{
          if(response[0]){
            this.isAsignada = true;
            this.saveBookingData(response[0].id);
            this.router.navigateByUrl(`finish-booking/${response[0].id}`);
          }else{
            this.isAsignada = false;
            return;
          }
        });
      };
      printValue();
    }
  }

  saveBookingData(idReserva: any) {
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

  private getAuthData() {
    const token = Storage.get({
      key: 'token',
    });
    const patente = Storage.get({
      key: 'patente',
    });
    if (!token || !patente) {
      return;
    }
    return {
      token,
      patente,
    };
  }

}
