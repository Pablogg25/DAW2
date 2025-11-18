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
}
