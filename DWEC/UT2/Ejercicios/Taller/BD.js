import { datos } from "./datos-taller";
import Vehiculo from "./Modelos/Vehiculo";
import Reparacion from "./Modelos/Reparación";
import Trabajo from "./Modelos/Trabajo";
import Propietario from "./Modelos/Propietario";
export default class BD {
  constructor(initial = datos) {
    this._vehiculos = (initial.vehiculos || []).map((v) => new Vehiculo(v));
    this._propietario = (initial.propietarios || []).map(
      (p) => new Propietario(p)
    );
    this._reparacion = (initial.reparaciones || []).map(
      (r) => new Reparacion(r)
    );
    // índices autoincrementales: toma max + 1
    this._siguienteVehiculoId = this._nextFrom(this._vehiculos, "vehiculoId");
    this._siguientePropietarioId = this._nextFrom(
      this._propietarios,
      "propietarioId"
    );
    this._siguienteReparacionId = this._nextFrom(
      this._reparaciones,
      "reparacionId"
    );
    // trabajo ids: buscar en trabajos existentes
    const trabajosIds = this._reparaciones.flatMap((r) =>
      (r.trabajos || []).map((t) => Number(t.trabajoId) || 0)
    );
    this._siguienteTrabajoId =
      (trabajosIds.length ? Math.max(...trabajosIds) : 0) + 1;
  }

  _nextFrom(arr, key) {
    if (!arr || arr.length === 0) return 1;
    const vals = arr.map((x) => Number(x[key]) || 0);
    return Math.max(...vals) + 1;
  }

  obtenerVehiculos() {
    return this._vehiculos.map((v) => ({ ...v }));
  }
  obetenerVehiculo(Filtro, valor) {
    if (!Filtro) return null;

    switch (filtro) {
      case "vehiculoId":
        return (
          this._vehiculos.find((v) => Number(v.vehiculoId) === Number(valor)) ??
          null
        );
      case "matricula":
        return (
          this._vehiculos.find(
            (v) =>
              String(v.matricula).toLowerCase() === String(valor).toLowerCase()
          ) ?? null
        );
      case "telefono":
        return (
          this._vehiculos.find((v) => String(v.telefono) === String(valor)) ??
          null
        );
      default:
        return null;
    }
  }

  crearVehiculo(data) {
    const v = new Vehiculo({
      ...data,
      vehiculoId: this._siguienteVehiculoId,
    });
    this._vehiculos.push(v);
    return v;
  }
  borrarVehiculo(vehiculoId) {
    const id = Number(vehiculoId);
    const idx = this._vehiculos.findIndex((v) => Number(v.vehiculoId) === id);
    if (idx === -1) return false;
    // eliminar reparaciones asociadas
    this._reparaciones = this._reparaciones.filter(
      (r) => Number(r.vehiculoId) !== id
    );
    this._vehiculos.splice(idx, 1);
    return true;
  }

  obtenerPropietarios() {
    return this._propietarios.map((p) => ({ ...p }));
  }

  obtenerPropietario(propietarioId) {
    return (
      this._propietarios.find(
        (p) => Number(p.propietarioId) === Number(propietarioId)
      ) ?? null
    );
  }

  crearPropietario(data) {
    const p = new Propietario({
      ...data,
      propietarioId: this._siguientePropietarioId++,
    });
    this._propietarios.push(p);
    return p;
  }

  obtenerReparaciones(filtro = null, valor = null) {
    if (!filtro) return this._reparaciones.map((r) => ({ ...r }));
    switch (filtro) {
      case "vehiculoId":
        return this._reparaciones
          .filter((r) => Number(r.vehiculoId) === Number(valor))
          .map((r) => ({ ...r }));
      case "fecha":
        return this._reparaciones
          .filter((r) => r.fecha === valor)
          .map((r) => ({ ...r }));
      case "pagado":
        return this._reparaciones
          .filter((r) => Boolean(r.pagado) === Boolean(valor))
          .map((r) => ({ ...r }));
      case "terminado":
        return this._reparaciones
          .filter((r) => Boolean(r.terminado) === Boolean(valor))
          .map((r) => ({ ...r }));
      default:
        return [];
    }
  }
}
