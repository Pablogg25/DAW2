import { Vehiculo } from "../Modelos/Vehiculo.js";
import { Reparacion } from "../Modelos/Reparacion.js";

export class BD {
  #vehiculos;
  #reparaciones;
  #siguienteVehiculoId;
  #siguienteReparacionId;

  constructor(datosIniciales) {
    this.#vehiculos = datosIniciales.vehiculos.map((v) => new Vehiculo(v));
    this.#reparaciones = datosIniciales.reparaciones.map(
      (r) => new Reparacion(r)
    );
    this.#siguienteVehiculoId = this.#vehiculos.length + 1;
    this.#siguienteReparacionId = this.#reparaciones.length + 1;
  }

  get siguienteVehiculoId() {
    return this.#siguienteVehiculoId;
  }
  get siguienteReparacionId() {
    return this.#siguienteReparacionId;
  }

  obtenerVehiculos() {
    return this.#vehiculos;
  }

  obtenerVehiculo(filtro, valor) {
    return this.#vehiculos.find((v) => String(v[filtro]) === String(valor));
  }
  crearVehiculo(vehiculo) {
    vehiculo.vehiculoId = this.#siguienteVehiculoId;
    this.#vehiculos.push(vehiculo);
  }

  borrarVehiculo(id) {
    this.#vehiculos = this.#vehiculos.filtrer((v) => v.vehiculoId !== id);
  }
  obtenerReparaciones(filtro, valor) {
    if (!filtro) return this.#reparaciones;
    return this.#reparaciones.filter(
      (r) => String(r[filtro]) === String(valor)
    );
  }
  obtenerReparacion(id) {
    return this.#reparaciones.find((r) => r.reparacionId === id);
  }
  crearReparacion(vehiculoId, reparacion) {
    reparacion.reparacionId = this.#siguienteReparacionId++;
    reparacion.vehiculoId = vehiculoId;
    this.#reparaciones.push(reparacion);
  }
  borrarReparacion(id) {
    this.#reparaciones = this.#reparaciones.filter(
      (r) => r.reparacionId !== id
    );
  }
}
