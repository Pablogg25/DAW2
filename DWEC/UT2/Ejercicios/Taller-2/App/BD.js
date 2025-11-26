import { Vehiculo } from "../Modelos/Vehiculo.js";
import { Reparacion } from "../Modelos/Reparacion.js";

export class BD {
  #vehiculos;
  #reparaciones;
  #siguienteVehiculoId;
  #siguienteReparacionId;

  constructor(datosIniciales) {
    this.#vehiculos = Array.isArray(datosIniciales?.vehiculos)
      ? datosIniciales.vehiculos.slice()
      : [];
    this.#reparaciones = Array.isArray(datosIniciales?.reparaciones)
      ? datosIniciales.reparaciones.slice()
      : [];
    this.#siguienteVehiculoId =
      (this.#vehiculos.reduce(
        (max, v) => Math.max(max, v.vehiculoId || 0),
        0
      ) || 0) + 1;
    this.#siguienteReparacionId =
      (this.#reparaciones.reduce(
        (max, r) => Math.max(max, r.reparacionId || 0),
        0
      ) || 0) + 1;
  }

  obtenerVehiculos() {
    return this.#vehiculos.slice();
  }

  // Buscar por vehiculoId | matricula | telefono
  obtenerVehiculo(filtro, valor) {
    const f = String(filtro || "")
      .toLowerCase()
      .trim();

    if (f === "vehiculoid") {
      const id = Number.parseInt(valor);
      if (!Number.isFinite(id)) return null;
      return this.#vehiculos.find((v) => v.vehiculoId === id) || null;
    }

    if (f === "matricula") {
      const q = String(valor || "")
        .trim()
        .toLowerCase();
      if (!q) return null;
      return (
        this.#vehiculos.find(
          (v) =>
            String(v.matricula || "")
              .trim()
              .toLowerCase() === q
        ) || null
      );
    }

    if (f === "telefono") {
      const q = String(valor || "").trim();
      if (!q) return null;
      // propietario puede no existir; protegemos el acceso
      return (
        this.#vehiculos.find(
          (v) => String(v.propietario?.telefono || "").trim() === q
        ) || null
      );
    }

    // Filtro no reconocido
    return null;
  }

  crearVehiculo(vehiculo) {
    const nuevo = { ...vehiculo };
    nuevo.vehiculoId = nuevo.vehiculoId || this.#siguienteVehiculoId++;
    this.#vehiculos.push(nuevo);
    return nuevo;
  }

  borrarVehiculo(vehiculoId) {
    const idx = this.#vehiculos.findIndex((v) => v.vehiculoId === vehiculoId);
    if (idx >= 0) this.#vehiculos.splice(idx, 1);
  }

  // Reparaciones (por si quieres filtrar por vehiculoId)
  obtenerReparaciones(filtro = null, valor = null) {
    const list = this.#reparaciones.slice();
    if (!filtro) return list;

    const f = String(filtro).toLowerCase().trim();

    if (f === "fecha") {
      const q = String(valor || "").trim();
      return list.filter((r) => String(r.fecha || "").trim() === q);
    }

    if (f === "pagado") {
      const q = Boolean(valor);
      return list.filter((r) => Boolean(r.pagado) === q);
    }

    if (f === "terminado") {
      const q = Boolean(valor);
      return list.filter((r) => Boolean(r.terminado) === q);
    }

    // Ampliación útil: filtrar por vehiculoId aunque el enunciado no lo pida explícito
    if (f === "vehiculoid") {
      const id = Number.parseInt(valor);
      if (!Number.isFinite(id)) return [];
      return list.filter((r) => r.vehiculoId === id);
    }

    return list;
  }

  obtenerReparacion(reparacionId) {
    return (
      this.#reparaciones.find((r) => r.reparacionId === reparacionId) || null
    );
  }

  crearReparacion(vehiculoId, reparacion) {
    const nueva = { ...reparacion };
    nueva.reparacionId = nueva.reparacionId || this.#siguienteReparacionId++;
    nueva.vehiculoId = vehiculoId;
    this.#reparaciones.push(nueva);
    return nueva;
  }

  borrarReparacion(reparacionId) {
    const idx = this.#reparaciones.findIndex(
      (r) => r.reparacionId === reparacionId
    );
    if (idx >= 0) this.#reparaciones.splice(idx, 1);
  }
}
