import Trabajo from "./Trabajo.js";

export default class Reparacion {
  constructor({
    reparacionId = null,
    vehiculoId = null,
    fecha = new Date().toISOString().slice(0, 10),
    descripcion = "",
    terminado = false,
    pagado = false,
    total = 0,
    trabajos = [],
  } = {}) {
    this.reparacionId = reparacionId;
    this.vehiculoId = vehiculoId;
    this.fecha = fecha;
    this.descripcion = descripcion;
    this.terminado = Boolean(terminado);
    this.pagado = Boolean(pagado);
    this.trabajos = (trabajos || []).map((t) =>
      t instanceof Trabajo ? t : new Trabajo(t)
    );
    this.total = Number(total) || this._calcTotal();
  }

  _calcTotal() {
    return +this.trabajos
      .reduce(
        (s, t) =>
          s +
          (Number(t.subtotal) ||
            Number(t.horas || 0) * Number(t.precioUnidad || 0)),
        0
      )
      .toFixed(2);
  }

  agregarTrabajo(trabajoData) {
    const t =
      trabajoData instanceof Trabajo ? trabajoData : new Trabajo(trabajoData);
    this.trabajos.push(t);
    this.total = this._calcTotal();
    return t;
  }

  borrarTrabajo(trabajoId) {
    const idx = this.trabajos.findIndex(
      (t) => Number(t.trabajoId) === Number(trabajoId)
    );
    if (idx === -1) return false;
    this.trabajos.splice(idx, 1);
    this.total = this._calcTotal();
    return true;
  }
}
