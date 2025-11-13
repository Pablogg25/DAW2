class Biblioteca {
  constructor({ bibliotecaId = null, nombre = "", ubicacion = "" } = {}) {
    this.bibliotecaId = bibliotecaId;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    // libros de la biblioteca se calcularán desde gestor (no se mantiene aquí)
  }
  generarHTMLCreacion() {
    return `
      <h2>Crear Biblioteca</h2>
      <form id="form-biblioteca-crear">
        <label>Nombre<br><input name="nombre" required /></label><br>
        <label>Ubicación<br><input name="ubicacion" /></label><br>
        <button type="submit" class="btn">Crear</button>
      </form>
    `;
  }

  generarHTMLEdicion() {
    return `
      <h2>Editar Biblioteca</h2>
      <form id="form-biblioteca-editar" data-id="${this.bibliotecaId}">
        <label>Nombre<br><input name="nombre" value="${this._esc(
          this.nombre
        )}" required /></label><br>
        <label>Ubicación<br><input name="ubicacion" value="${this._esc(
          this.ubicacion
        )}" /></label><br>
        <button type="submit" class="btn">Guardar</button>
      </form>
    `;
  }

  _esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}
