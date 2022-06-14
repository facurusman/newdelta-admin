export class Reserva {
  readonly id: number;
  readonly email: string;
  readonly desde: string;
  readonly hasta: string;
  readonly precio: number;
  readonly patente: string;

  constructor({
    id,
    email,
    desde,
    hasta,
    precio,
    patente,
  }: {
      id: number;
    email: string;
    desde: string;
    hasta: string;
    precio: number;
    patente: string;
    }) {
    this.id = id;
    this.email = email;
    this.desde = desde;
    this.hasta = hasta;
    this.precio = precio;
    this.patente = patente;
  }
}
