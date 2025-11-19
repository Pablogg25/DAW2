export default class Propietario {
  constructor({
    propietarioId = null,
    nombre = "",
    dni = "",
    telefono = "",
    direccion = "",
  } = {}) {
    this.propietarioId = propietarioId;
    this.nombre = nombre;
    this.dni = dni;
    this.telefono = telefono;
    this.direccion = direccion;
  }

  generarHTMLResumen() {
    return `<div class="propietario">
      <strong>${this.nombre}</strong><br>
      Tel: ${this.telefono || "-"}<br>
      DNI: ${this.dni || "-"}
    </div>`;
  }
}
