export default class Trabajo {
  constructor({
    trabajoId = null,
    reparacionId = null,
    descripcion = "",
    horas = 0,
    precioUnidad = 0,
    subtotal = null,
  } = {}) {
    this.trabajoId = trabajoId;
    this.reparacionId = reparacionId;
    this.descripcion = descripcion;
    this.horas = Number(horas) || 0;
    this.precioUnidad = Number(precioUnidad) || 0;
    this.subtotal =
      subtotal == null
        ? +(this.horas * this.precioUnidad).toFixed(2)
        : Number(subtotal);
  }
}
