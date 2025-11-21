export class Biblioteca {
  #bibliotecaId;
  #nombre;
  #ubicacion;
  #libros;

  constructor({ bibliotecaId, nombre, ubicacion }, librosAll = []) {
    this.#bibliotecaId = bibliotecaId;
    this.#nombre = nombre;
    this.#ubicacion = ubicacion;
    this.#libros = librosAll.filter((l) => l.bibliotecaId === bibliotecaId);
  }

  get bibliotecaId() {
    return this.#bibliotecaId;
  }
  get nombre() {
    return this.#nombre;
  }
  get ubicacion() {
    return this.#ubicacion;
  }
  get libros() {
    return this.#libros;
  }

  generarHTMLCreacion() {
    return `
      <form id="form-biblioteca" data-entidad="biblioteca" data-accion="guardar">
        <div><label>Nombre</label><input name="nombre" required /></div>
        <div><label>Ubicación</label><input name="ubicacion" /></div>
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  generarHTMLEdicion() {
    const librosHtml = this.#libros.length
      ? `<ul>${this.#libros
          .map((l) => `<li>${l.titulo} (ID:${l.libroId})</li>`)
          .join("")}</ul>`
      : `<p>Sin libros en esta biblioteca.</p>`;

    return `
      <form id="form-biblioteca" data-entidad="biblioteca" data-accion="guardar" data-id="${
        this.#bibliotecaId
      }">
        <div><label>Nombre</label><input name="nombre" value="${
          this.#nombre
        }" /></div>
        <div><label>Ubicación</label><input name="ubicacion" value="${
          this.#ubicacion
        }" /></div>
        <button type="submit">Guardar</button>
      </form>
      <h4>Libros en esta biblioteca</h4>
      ${librosHtml}
    `;
  }
}
