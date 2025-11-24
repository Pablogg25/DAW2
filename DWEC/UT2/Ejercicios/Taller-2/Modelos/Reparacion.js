export class Reparacion {
  constructor({
    reparacionId,
    vehiculoId,
    fecha,
    terminado,
    pagado,
    trabajos = [],
  }) {
    this.reparacionId = reparacionId;
    this.vehiculoId = vehiculoId;
    this.fecha = fecha;
    this.terminado = terminado;
    this.pagado = pagado;
    this.trabajos = trabajos;
  }
}
