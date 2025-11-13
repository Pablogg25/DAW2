export default class Libro {
  constructor({
    libroId = null,
    titulo = "",
    ISBN = "",
    autorId = null,
    bibliotecaId = null,
    prestamos = [],
  } = {}) {
    this.libroId = libroId;
    this.titulo = titulo;
    this.ISBN = ISBN;
    this.autorId = autorId;
    this.bibliotecaId = bibliotecaId;
    // prestamos: array de { fechaPrestamo: ISO, fechaDevolucion: ISO|null }
    this.prestamos = Array.isArray(prestamos) ? prestamos : [];
  }
  estaDisponible() {
    if (!this.prestamos.length) return true;
    const ultimo = this.prestamos[this.prestamos.length - 1];
    return ultimo.fechaDevolucion;
  }

  generarHTMLCreacion() {
    return `
      <h2>Crear Libro</h2>
      <form id="form-libro-crear" class="form-libro">
        <label>Título<br><input name="titulo" required /></label><br>
        <label>ISBN<br><input name="ISBN" required /></label><br>
        <label>Autor (ID)<br><input name="autorId" type="number" required /></label><br>
        <label>Biblioteca (ID)<br><input name="bibliotecaId" type="number" required /></label><br>
        <button type="submit" class="btn">Crear</button>
      </form>
      `;
  }

  generarHTMLPropiedades($biblio) {
    // $biblio usado para mostrar nombres relacionados
    const autor = $biblio.buscarAutor(this.autorId);
    const biblioteca = $biblio.buscarBiblioteca(this.bibliotecaId);
    return `
      <h2>Libro: ${this.titulo}</h2>
      <p><strong>ID:</strong> ${this.libroId}</p>
      <p><strong>ISBN:</strong> ${this.ISBN}</p>
      <p><strong>Autor:</strong> ${
        autor ? autor.nombre + " (ID:" + autor.autorId + ")" : "—"
      }</p>
      <p><strong>Biblioteca:</strong> ${
        biblioteca
          ? biblioteca.nombre + " (ID:" + biblioteca.bibliotecaId + ")"
          : "—"
      }</p>
      <p><strong>Disponibilidad:</strong> ${
        this.estaDisponible ? "Disponible" : "Prestado"
      }</p>

      <div>
        <button class="menu-action biblio-libro-editar" data-id="${
          this.libroId
        }">Editar</button>
        <button class="menu-action biblio-libro-borrar" data-id="${
          this.libroId
        }">Borrar</button>
        <button class="menu-action biblio-libro-listar-prestamos" data-id="${
          this.libroId
        }">Listar préstamos</button>
        <button class="menu-action biblio-libro-crear-prestamo" data-id="${
          this.libroId
        }">Crear préstamo</button>
        <button class="menu-action biblio-libro-devolver" data-id="${
          this.libroId
        }">Devolver préstamo</button>
      </div>
    `;
  }

  generarHTMLEdicion() {
    return `
      <h2>Editar Libro</h2>
      <form id="form-libro-editar" data-id="${this.libroId}">
        <label>Título<br><input name="titulo" value="${this._esc(
          this.titulo
        )}" required /></label><br>
        <label>ISBN<br><input name="ISBN" value="${this._esc(
          this.ISBN
        )}" required /></label><br>
        <label>Autor (ID)<br><input name="autorId" type="number" value="${
          this.autorId || ""
        }" required /></label><br>
        <label>Biblioteca (ID)<br><input name="bibliotecaId" type="number" value="${
          this.bibliotecaId || ""
        }" required /></label><br>
        <button type="submit" class="btn">Guardar</button>
      </form>`;
  }

  generarHTMLListadoPrestamos() {
    const filas = this.prestamos.length
      ? this.prestamos
          .map(
            (p, i) =>
              `<tr><td>${i + 1}</td><td>${p.fechaPrestamo}</td><td>${
                p.fechaDevolucion || "-"
              }</td></tr>`
          )
          .join("")
      : `<tr><td colspan="3">Sin préstamos</td></tr>`;
    return `
      <h3>Préstamos de "${this.titulo}"</h3>
      <table class="list-table">
        <thead><tr><th>#</th><th>Fecha préstamo</th><th>Fecha devolución</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>`;
  }
  _esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}
