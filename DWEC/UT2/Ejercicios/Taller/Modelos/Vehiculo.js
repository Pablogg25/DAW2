export default class Vehiculo {
  constructor({
    vehiculoId = null,
    matricula = "",
    marca = "",
    modelo = "",
    propietarioId = null,
    telefono = "",
    notas = "",
  } = {}) {
    this.vehiculoId = vehiculoId;
    this.matricula = matricula;
    this.marca = marca;
    this.modelo = modelo;
    this.propietarioId = propietarioId;
    this.telefono = telefono;
    this.notas = notas;
  }

  // Representación breve para tablas
  toRow() {
    return {
      vehiculoId: this.vehiculoId,
      matricula: this.matricula,
      descripcion: `${this.marca || ""} ${this.modelo || ""}`.trim(),
      telefono: this.telefono,
    };
  }

  // Generadores de HTML (plantilla mínima, personaliza en GestionMecanica)
  generarHTMLListadoRow() {
    const r = this.toRow();
    return `<tr>
      <td>${r.vehiculoId}</td>
      <td>${r.matricula}</td>
      <td>${r.descripcion}</td>
      <td class="small">${r.telefono}</td>
      <td>
        <button data-action="ver-vehiculo" data-id="${this.vehiculoId}">Ver</button>
        <button data-action="ver-reparaciones" data-id="${this.vehiculoId}">Reparaciones</button>
        <button data-action="borrar-vehiculo" data-id="${this.vehiculoId}">Borrar</button>
      </td>
    </tr>`;
  }
}
