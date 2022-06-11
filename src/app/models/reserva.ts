export class Reserva {
  readonly nombre: string;
  readonly desde: string;
  readonly hasta: string;
  readonly precio: number;
  readonly patente: string;

  constructor({
    nombre,
    desde,
    hasta,
    precio,
    patente,
  }: {
    nombre: string;
    desde: string;
    hasta: string;
    precio: number;
    patente: string;
  }) {
    this.nombre = nombre;
    this.desde = desde;
    this.hasta = hasta;
    this.precio = precio;
    this.patente = patente;
  }
}
