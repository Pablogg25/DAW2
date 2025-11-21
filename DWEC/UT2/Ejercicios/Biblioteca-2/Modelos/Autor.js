export class Autor {
  #autorId;
  #nombre;
  #nacionalidad;
  #biografia;
  #libros;
  constructor({ autorId, nombre, nacionalidad, biografia, libros = [] }) {
    this.#autorId = autorId;
    this.#nombre = nombre;
    this.#nacionalidad = nacionalidad;
    this.#biografia = biografia;
    this.#libros = libros;
  }
  get autorId() {
    return this.#autorId;
  }
  get nombre() {
    return this.#nombre;
  }
  get nacionalidad() {
    return this.#nacionalidad;
  }
  get biografia() {
    return this.#biografia;
  }
  get libros() {
    return this.#libros;
  }

  generarHTMLCreacion() {
    return `
      <form id="form-autor" data-entidad="autor" data-accion="guardar">
        <div><label>Nombre</label><input name="nombre" required /></div>
        <div><label>Nacionalidad</label><input name="nacionalidad" /></div>
        <div><label>Biografía</label><textarea name="biografia"></textarea></div>
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  generarHTMLEdicion() {
    return `
      <form id="form-autor" data-entidad="autor" data-accion="guardar" data-id="${
        this.#autorId
      }">
        <div><label>Nombre</label><input name="nombre" value="${
          this.#nombre
        }" /></div>
        <div><label>Nacionalidad</label><input name="nacionalidad" value="${
          this.#nacionalidad
        }" /></div>
        <div><label>Biografía</label><textarea name="biografia">${
          this.#biografia
        }</textarea></div>
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  generarHTMLPropiedades() {
    return `
      <h3>${this.#nombre}</h3>
      <p>Nacionalidad: ${this.#nacionalidad}</p>
      <p>Biografía: ${this.#biografia}</p>
      <h4>Libros publicados</h4>
      <ul>
        ${this.#libros
          .map(
            (t) => `
          <li>
            ${t}
            <button data-accion="autor-del-libro" data-entidad="autor" data-id="${
              this.#autorId
            }" data-titulo="${t}">Eliminar</button>
          </li>
        `
          )
          .join("")}
      </ul>
      <input type="text" id="autor-libro-titulo" placeholder="Nuevo título" />
      <button data-accion="autor-add-libro" data-entidad="autor" data-id="${
        this.#autorId
      }">Añadir libro</button>
      <button data-accion="editar" data-entidad="autor" data-id="${
        this.#autorId
      }">Editar</button>
      <button data-accion="borrar" data-entidad="autor" data-id="${
        this.#autorId
      }">Borrar</button>
    `;
  }
}
