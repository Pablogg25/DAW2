export default class Autor {
  constructor({
    autorId = null,
    nombre = "",
    nacionalidad = "",
    biografia = "",
    libros = [],
  } = {}) {
    this.autorId = autorId;
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
    this.biografia = biografia;
    // libros: lista de títulos (no ids)
    this.libros = Array.isArray(libros) ? libros : [];
  }

  generarHTMLCreacion() {
    return `
      <h2>Crear Autor</h2>
      <form id="form-autor-crear">
        <label>Nombre<br><input name="nombre" required /></label><br>
        <label>Nacionalidad<br><input name="nacionalidad" /></label><br>
        <label>Biografía<br><textarea name="biografia"></textarea></label><br>
        <button type="submit" class="btn">Crear</button>
      </form>`;
  }

  generarHTMLPropiedades() {
    const filas = this.libros.length
      ? this.libros
          .map(
            (t, i) =>
              `<tr><td>${i + 1}</td><td>${this._esc(
                t
              )}</td><td><button class="biblio-autor-eliminar-libro" data-autor="${
                this.autorId
              }" data-titulo="${this._esc(t)}">Eliminar</button></td></tr>`
          )
          .join("")
      : `<tr><td colspan="3">Sin libros</td></tr>`;
    return `
      <h2>Autor: ${this._esc(this.nombre)}</h2>
      <p><strong>ID:</strong> ${this.autorId}</p>
      <p><strong>Nacionalidad:</strong> ${this._esc(this.nacionalidad)}</p>
      <p><strong>Biografía:</strong> ${this._esc(this.biografia)}</p>
      <h3>Libros publicados</h3>
      <table class="list-table">
        <thead><tr><th>#</th><th>Título</th><th>Acción</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>
      <h4>Añadir libro (título)</h4>
      <form id="form-autor-anadir-libro" data-autor="${this.autorId}">
        <input name="titulo" required />
        <button type="submit">Añadir</button>
      </form>
    `;
  }

  generarHTMLEdicion() {
    return `
      <h2>Editar Autor</h2>
      <form id="form-autor-editar" data-id="${this.autorId}">
        <label>Nombre<br><input name="nombre" value="${this._esc(
          this.nombre
        )}" required /></label><br>
        <label>Nacionalidad<br><input name="nacionalidad" value="${this._esc(
          this.nacionalidad
        )}" /></label><br>
        <label>Biografía<br><textarea name="biografia">${this._esc(
          this.biografia
        )}</textarea></label><br>
        <button type="submit" class="btn">Guardar</button>
      </form>`;
  }

  _esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}
