import datosIniciales from "../datos/datos-taller.js";
import { BD } from "./BD.js";
export class GestionMecanica {
  #clienteBD;
  #contenedor;

  constructor() {
    this.#clienteBD = new BD(datosIniciales);
  }

  iniciarApp(selector) {
    this.#contenedor = document.querySelector(selector);
    if (!this.#contenedor) {
      alert("No se puede inicar la aplicacion");
      return;
    }
    this.#contenedor.innerHTML = this.#generarHTMLBase();
    this.#asignarEventos();
  }

  // ================== VISTAS BASE ==================
  #generarHTMLBase() {
    return `
      <nav>
        <button data-accion="inicio">Inicio</button>
        <button data-accion="vehiculos">Vehículos</button>
        <button data-accion="noTerminadas">No terminadas</button>
        <button data-accion="noPagadas">No pagadas</button>
        <button data-accion="presupuestos">Presupuestos</button>
      </nav>
      <section id="resultado"></section>
    `;
  }

  #generarHTMLInicio() {
    return `
      <h2>Inicio Taller Mecánico</h2>
      <form id="form-buscar">
        <select name="filtro">
          <option value="matricula">Matrícula</option>
          <option value="telefono">Teléfono</option>
        </select>
        <input name="valor" placeholder="Buscar..." />
        <button type="submit">Buscar</button>
      </form>
    `;
  }

  // ================== VEHÍCULOS ==================
  #generarHTMLVehiculos(vehiculos) {
    return `
      <h2>Listado de Vehículos</h2>
      <button data-accion="crearVehiculo">Crear vehículo</button>
      <table>
        <thead><tr><th>ID</th><th>Matrícula</th><th>Marca</th><th>Modelo</th><th>Acciones</th></tr></thead>
        <tbody>
          ${vehiculos
            .map(
              (v) => `
            <tr data-id="${v.vehiculoId}">
              <td>${v.vehiculoId}</td>
              <td>${v.matricula}</td>
              <td>${v.marca}</td>
              <td>${v.modelo}</td>
              <td>
                <button data-accion="verVehiculo" data-id="${v.vehiculoId}">Ver</button>
                <button data-accion="verReparaciones" data-id="${v.vehiculoId}">Reparaciones</button>
                <button data-accion="borrarVehiculo" data-id="${v.vehiculoId}">Borrar</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  #generarHTMLVehiculo(vehiculoId = null) {
    let vehiculo = null;
    if (vehiculoId) {
      vehiculo = this.#clienteBD.obtenerVehiculo("vehiculoId", vehiculoId);
    }

    return `
      <h2>${vehiculo ? "Editar vehículo" : "Crear vehículo"}</h2>
      <form id="form-vehiculo" data-entidad="vehiculo" data-accion="guardar" ${
        vehiculo ? `data-id="${vehiculo.vehiculoId}"` : ""
      }>
        <fieldset>
          <legend>Datos del vehículo</legend>
          <div><label>Matrícula</label><input name="matricula" value="${
            vehiculo?.matricula ?? ""
          }" required /></div>
          <div><label>Marca</label><input name="marca" value="${
            vehiculo?.marca ?? ""
          }" /></div>
          <div><label>Modelo</label><input name="modelo" value="${
            vehiculo?.modelo ?? ""
          }" /></div>
        </fieldset>
        <fieldset>
          <legend>Propietario</legend>
          <div><label>Nombre</label><input name="propietarioNombre" value="${
            vehiculo?.propietario?.nombre ?? ""
          }" required /></div>
          <div><label>Teléfono</label><input name="propietarioTelefono" value="${
            vehiculo?.propietario?.telefono ?? ""
          }" required /></div>
        </fieldset>
        <button type="submit">Guardar</button>
      </form>
      ${
        vehiculo
          ? `<button data-accion="verReparaciones" data-entidad="vehiculo" data-id="${vehiculo.vehiculoId}">Ver reparaciones</button>`
          : ""
      }
    `;
  }

  // ================== REPARACIONES ==================
  #generarHTMLReparaciones(reparaciones) {
    return `
      <h2>Listado de reparaciones</h2>
      <table>
        <thead><tr><th>ID</th><th>Fecha</th><th>Terminado</th><th>Pagado</th><th>Acciones</th></tr></thead>
        <tbody>
          ${reparaciones
            .map(
              (r) => `
            <tr data-entidad="reparacion" data-id="${r.reparacionId}">
              <td>${r.reparacionId}</td>
              <td>${r.fecha}</td>
              <td>${r.terminado}</td>
              <td>${r.pagado}</td>
              <td>
                <button data-accion="verReparacion" data-id="${r.reparacionId}">Ver</button>
                <button data-accion="borrarReparacion" data-id="${r.reparacionId}">Borrar</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  #generarHTMLReparacion(reparacionId = 0, vehiculoId = 0) {
    let reparacion = null;
    if (reparacionId) {
      reparacion = this.#clienteBD.obtenerReparacion(reparacionId);
    }

    const trabajosHtml = reparacion?.trabajos?.length
      ? `<ul>${reparacion.trabajos
          .map(
            (t) => `
          <li>
            ${t.descripcion} - ${t.coste}€
            <button type="button" data-accion="borrarTrabajo" data-id="${t.trabajoId}">Quitar</button>
          </li>`
          )
          .join("")}</ul>`
      : `<p>Sin trabajos añadidos.</p>`;

    return `
      <h2>${reparacion ? "Editar reparación" : "Nueva reparación"}</h2>
      <form id="form-reparacion" data-entidad="reparacion" data-accion="guardar"
            ${
              reparacion
                ? `data-id="${reparacion.reparacionId}"`
                : `data-vehiculo="${vehiculoId}"`
            }>
        <div><label>Fecha</label><input type="date" name="fecha" value="${
          reparacion?.fecha ?? ""
        }" required /></div>
        <div><label>Terminado</label><input type="checkbox" name="terminado" ${
          reparacion?.terminado ? "checked" : ""
        } /></div>
        <div><label>Pagado</label><input type="checkbox" name="pagado" ${
          reparacion?.pagado ? "checked" : ""
        } /></div>

        <fieldset>
          <legend>Trabajos</legend>
          <div id="trabajos">${trabajosHtml}</div>
          <button type="button" id="add-trabajo">Añadir trabajo</button>
        </fieldset>

        <button type="submit">Guardar reparación</button>
      </form>
    `;
  }

  #asignarEventos() {
    this.#contenedor.addEventListener("click", (ev) => {
      const btn = ev.target.closest("button[data-accion]");
      if (!btn) return;

      const accion = btn.dataset.accion;
      const id = parseInt(btn.dataset.id);
      const resultado = document.getElementById("resultado");
      switch (accion) {
        case "inicio":
          resultado.innerHTML = this.#generarHTMLInicio();
          break;

        case "vehiculos":
          resultado.innerHTML = this.#generarHTMLVehiculos(
            this.#clienteBD.obtenerVehiculos()
          );
          break;

        case "crearVehiculo":
          resultado.innerHTML = this.#generarHTMLVehiculo();
          break;

        case "verVehiculo":
          resultado.innerHTML = this.#generarHTMLVehiculo(id);
          break;

        case "borrarVehiculo":
          this.#clienteBD.borrarVehiculo(id);
          resultado.innerHTML = this.#generarHTMLVehiculos(
            this.#clienteBD.obtenerVehiculos()
          );
          break;

        case "verReparaciones":
          resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparaciones("vehiculoId", id)
          );
          break;

        case "verReparacion":
          resultado.innerHTML = this.#generarHTMLReparacion(id);
          break;

        case "borrarReparacion":
          this.#clienteBD.borrarReparacion(id);
          resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparaciones()
          );
          break;

        case "borrarTrabajo":
          // Eliminar trabajo en el DOM (y luego persistir en BD al guardar)
          const li = ev.target.closest("li");
          if (li) li.remove();
          break;

        case "presupuestos":
          // Ejemplo: filtrar reparaciones no pagadas y no terminadas como "presupuestos"
          resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD
              .obtenerReparaciones("terminado", false)
              .filter((r) => !r.pagado)
          );
          break;

        case "noTerminadas":
          resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparaciones("terminado", false)
          );
          break;

        case "noPagadas":
          resultado.innerHTML = this.#generarHTMLReparaciones(
            this.#clienteBD.obtenerReparaciones("pagado", false)
          );
          break;

        default:
          console.warn("Acción no reconocida:", accion);
      }
    });
  }
}
