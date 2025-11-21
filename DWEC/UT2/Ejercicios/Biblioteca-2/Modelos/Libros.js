export class Libro {
  #libroId;
  #titulo;
  #ISBN;
  #autorId;
  #bibliotecaId;
  #prestamos;

  constructor({
    libroId,
    titulo,
    ISBN,
    autorId,
    bibliotecaId,
    prestamos = [],
  }) {
    this.#libroId = libroId;
    this.#titulo = titulo;
    this.#ISBN = ISBN;
    this.#autorId = autorId;
    this.#bibliotecaId = bibliotecaId;
    this.#prestamos = prestamos;
  }

  get libroId() {
    return this.#libroId;
  }
  get titulo() {
    return this.#titulo;
  }
  get ISBN() {
    return this.#ISBN;
  }
  get autorId() {
    return this.#autorId;
  }
  get bibliotecaId() {
    return this.#bibliotecaId;
  }
  get prestamos() {
    return this.#prestamos;
  }

  get estaDisponible() {
    return !this.#prestamos.some((p) => !p.fechaDevolucion);
  }

  generarHTMLCreacion() {
    return `
      <form id="form-libro" data-entidad="libro" data-accion="guardar">
        <div><label>Título</label><input name="titulo" required /></div>
        <div><label>ISBN</label><input name="ISBN" required /></div>
        <div><label>Autor</label><select name="autorId"></select></div>
        <div><label>Biblioteca</label><select name="bibliotecaId"></select></div>
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  generarHTMLEdicion() {
    return `
      <form id="form-libro" data-entidad="libro" data-accion="guardar" data-id="${
        this.#libroId
      }">
        <div><label>Título</label><input name="titulo" value="${
          this.#titulo
        }" /></div>
        <div><label>ISBN</label><input name="ISBN" value="${
          this.#ISBN
        }" /></div>
        <div><label>Autor</label><select name="autorId"></select></div>
        <div><label>Biblioteca</label><select name="bibliotecaId"></select></div>
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  generarHTMLPropiedades() {
    return `
      <h3>${this.#titulo}</h3>
      <p>ISBN: ${this.#ISBN}</p>
      <p>AutorId: ${this.#autorId}</p>
      <p>BibliotecaId: ${this.#bibliotecaId}</p>
      <p>Disponible: ${this.estaDisponible ? "Sí" : "No"}</p>
      <button data-accion="editar" data-entidad="libro" data-id="${
        this.#libroId
      }">Editar</button>
      <button data-accion="borrar" data-entidad="libro" data-id="${
        this.#libroId
      }">Borrar</button>
      <button data-accion="listar-prestamos" data-entidad="libro" data-id="${
        this.#libroId
      }">Ver préstamos</button>
      ${
        this.estaDisponible
          ? `<button data-accion="prestar" data-entidad="libro" data-id="${
              this.#libroId
            }">Prestar</button>`
          : `<button data-accion="devolver" data-entidad="libro" data-id="${
              this.#libroId
            }">Devolver</button>`
      }
    `;
  }

  generarHTMLListadoPrestamos() {
    if (!this.#prestamos.length) return `<p>Sin préstamos registrados.</p>`;
    return `
      <table>
        <thead><tr><th>Fecha préstamo</th><th>Fecha devolución</th></tr></thead>
        <tbody>
          ${this.#prestamos
            .map(
              (p) => `
            <tr>
              <td>${p.fechaPrestamo}</td>
              <td>${p.fechaDevolucion ?? "-"}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
}
