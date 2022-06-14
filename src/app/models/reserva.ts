export class Reserva {
  readonly id: number;
  readonly nombre: string;
  readonly desde: string;
  readonly hasta: string;
  readonly precio: number;
  readonly patente: string;

  constructor({
    id,
    nombre,
    desde,
    hasta,
    precio,
    patente,
  }: {
      id: number;
    nombre: string;
    desde: string;
    hasta: string;
    precio: number;
    patente: string;
    }) {
    this.id = id;
    this.nombre = nombre;
    this.desde = desde;
    this.hasta = hasta;
    this.precio = precio;
    this.patente = patente;
  }
}
