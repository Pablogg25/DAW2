import datosIniciales from "../Datos/datos";
import { Libro } from "../Modelos/Libros";
import { Autor } from "../Modelos/Autor";
import { Biblioteca } from "../Modelos/Biblioteca";

const $biblio = (() => {
  // Estado interno (privado)
  let autores = datosIniciales.map((a) => new Autor(a));
  let libros = datosIniciales.map((l) => new Libro(l));
  let biblioteca = datosIniciales.map((b) => new Biblioteca(b));

  // Incrementales por clase (calculados al iniciar)
  let nextIds = {
    autorId: Math.max(0, ...autores.map((a) => a.autorId)) + 1,
    libroId: Math.max(0, ...libros.map((l) => l.libroId)) + 1,
    bibliotecaId: Math.max(0, ...bibliotecas.map((b) => b.bibliotecaId)) + 1,
  };
  // Helpers UI
  const $app = () => document.getElementById("app");
  const setAppHTML = (html) => {
    $app().innerHTML = html;
    asignarManejadores();
  };
  // Listados
  const generarHTMLListadoAutores = () => `
    <div class="actions">
      <button data-accion="crear" data-entidad="autor">Crear autor</button>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Nombre</th><th>Nacionalidad</th><th>Acciones</th></tr></thead>
      <tbody>
        ${autores
          .map(
            (a) => `
          <tr data-entidad="autor" data-id="${a.autorId}">
            <td>${a.autorId}</td>
            <td>${a.nombre}</td>
            <td>${a.nacionalidad ?? "-"}</td>
            <td class="actions">
              <button data-accion="ver" data-entidad="autor" data-id="${
                a.autorId
              }">Ver</button>
              <button data-accion="editar" data-entidad="autor" data-id="${
                a.autorId
              }">Editar</button>
              <button data-accion="borrar" data-entidad="autor" data-id="${
                a.autorId
              }">Borrar</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  const generarHTMLListadoLibros = () => `
    <div class="actions">
      <button data-accion="crear" data-entidad="libro">Crear libro</button>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Título</th><th>ISBN</th><th>AutorId</th><th>BibliotecaId</th><th>Disp.</th><th>Acciones</th></tr></thead>
      <tbody>
        ${libros
          .map(
            (l) => `
          <tr data-entidad="libro" data-id="${l.libroId}">
            <td>${l.libroId}</td>
            <td>${l.titulo}</td>
            <td>${l.ISBN}</td>
            <td>${l.autorId}</td>
            <td>${l.bibliotecaId}</td>
            <td>${l.estaDisponible ? "Sí" : "No"}</td>
            <td class="actions">
              <button data-accion="ver" data-entidad="libro" data-id="${
                l.libroId
              }">Ver</button>
              <button data-accion="editar" data-entidad="libro" data-id="${
                l.libroId
              }">Editar</button>
              <button data-accion="borrar" data-entidad="libro" data-id="${
                l.libroId
              }">Borrar</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  const generarHTMLListadoBibliotecas = () => `
    <div class="actions">
      <button data-accion="crear" data-entidad="biblioteca">Crear biblioteca</button>
    </div>
    <table>
      <thead><tr><th>ID</th><th>Nombre</th><th>Ubicación</th><th>Acciones</th></tr></thead>
      <tbody>
        ${bibliotecas
          .map(
            (b) => `
          <tr data-entidad="biblioteca" data-id="${b.bibliotecaId}">
            <td>${b.bibliotecaId}</td>
            <td>${b.nombre}</td>
            <td>${b.ubicacion ?? "-"}</td>
            <td class="actions">
              <button data-accion="ver" data-entidad="biblioteca" data-id="${
                b.bibliotecaId
              }">Ver</button>
              <button data-accion="editar" data-entidad="biblioteca" data-id="${
                b.bibliotecaId
              }">Editar</button>
              <button data-accion="borrar" data-entidad="biblioteca" data-id="${
                b.bibliotecaId
              }">Borrar</button>
            </td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;
  // Búsquedas (libros por título; autores por nombre)
  const buscarLibrosPorTitulo = (q) => {
    const s = q.trim().toLowerCase();
    return libros.filter((l) => l.titulo.toLowerCase().includes(s));
  };
  const buscarLibrosPorAutor = (q) => {
    const s = q.trim().toLowerCase();
    const autorIds = autores
      .filter((a) => a.nombre.toLowerCase().includes(s))
      .map((a) => a.autorId);
    return libros.filter((l) => autorIds.includes(l.autorId));
  };

  const generarHTMLResultadoBuscador = (tipo, resultados) => {
    if (!resultados.length) return `<p>Sin resultados.</p>`;
    if (tipo === "libro") {
      return `
        <table>
          <thead><tr><th>ID</th><th>Título</th><th>Acciones</th></tr></thead>
          <tbody>
            ${resultados
              .map(
                (l) => `
              <tr>
                <td>${l.libroId}</td>
                <td>${l.titulo}</td>
                <td class="actions">
                  <button data-accion="ver" data-entidad="libro" data-id="${l.libroId}">Ver</button>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    }
    // autores
    return `
      <table>
        <thead><tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr></thead>
        <tbody>
          ${resultados
            .map(
              (a) => `
            <tr>
              <td>${a.autorId}</td>
              <td>${a.nombre}</td>
              <td class="actions">
                <button data-accion="ver" data-entidad="autor" data-id="${a.autorId}">Ver</button>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  };
  // Buscar por ID
  const buscarLibro = (id) => libros.find((l) => l.libroId === Number(id));
  const buscarAutor = (id) => autores.find((a) => a.autorId === Number(id));
  const buscarBiblioteca = (id) =>
    bibliotecas.find((b) => b.bibliotecaId === Number(id));

  // Crear
  const crearLibro = (payload) => {
    const libro = new Libro({
      libroId: nextIds.libroId++,
      prestamos: [],
      ...payload,
    });
    libros.push(libro);
    bibliotecas = bibliotecas.map(
      (b) =>
        new Biblioteca(
          {
            bibliotecaId: b.bibliotecaId,
            nombre: b.nombre,
            ubicacion: b.ubicacion,
          },
          libros
        )
    );
    return libro;
  };
  const crearAutor = (payload) => {
    const autor = new Autor({
      autorId: nextIds.autorId++,
      libros: [],
      ...payload,
    });
    autores.push(autor);
    return autor;
  };
  const crearBiblioteca = (payload) => {
    const bib = new Biblioteca(
      { bibliotecaId: nextIds.bibliotecaId++, ...payload },
      libros
    );
    bibliotecas.push(bib);
    return bib;
  };

  // Borrar
  const borrarLibro = (id) => {
    const idx = libros.findIndex((l) => l.libroId === Number(id));
    if (idx > -1) libros.splice(idx, 1);
    bibliotecas = bibliotecas.map(
      (b) =>
        new Biblioteca(
          {
            bibliotecaId: b.bibliotecaId,
            nombre: b.nombre,
            ubicacion: b.ubicacion,
          },
          libros
        )
    );
  };
  const borrarAutor = (id) => {
    const idx = autores.findIndex((a) => a.autorId === Number(id));
    if (idx > -1) autores.splice(idx, 1);
  };
  const borrarBiblioteca = (id) => {
    const idx = bibliotecas.findIndex((b) => b.bibliotecaId === Number(id));
    if (idx > -1) bibliotecas.splice(idx, 1);
  };

  // Préstamos
  const crearPrestamo = (libro) => {
    if (!libro.estaDisponible) return false;
    const hoy = new Date().toISOString().slice(0, 10);
    libro.prestamos.push({ fechaPrestamo: hoy, fechaDevolucion: null });
    return true;
  };
  const devolverPrestamo = (libro) => {
    const activo = libro.prestamos.find((p) => !p.fechaDevolucion);
    if (!activo) return false;
    const hoy = new Date().toISOString().slice(0, 10);
    activo.fechaDevolucion = hoy;
    return true;
  };

  // Render de vistas
  const renderListado = (entidad) => {
    if (entidad === "autor") setAppHTML(generarHTMLListadoAutores());
    else if (entidad === "libro") setAppHTML(generarHTMLListadoLibros());
    else setAppHTML(generarHTMLListadoBibliotecas());
  };
  const renderCrear = (entidad) => {
    if (entidad === "autor") setAppHTML(new Autor({}).generarHTMLCreacion());
    else if (entidad === "libro") {
      setAppHTML(new Libro({}).generarHTMLCreacion());
      rellenarSelectsLibro();
    } else setAppHTML(new Biblioteca({}).generarHTMLCreacion());
  };
  const renderVer = (entidad, id) => {
    if (entidad === "autor") {
      const a = buscarAutor(id);
      setAppHTML(a.generarHTMLPropiedades());
    } else if (entidad === "libro") {
      const l = buscarLibro(id);
      setAppHTML(l.generarHTMLPropiedades());
    } else {
      const b = buscarBiblioteca(id);
      const bb = new Biblioteca(
        {
          bibliotecaId: b.bibliotecaId,
          nombre: b.nombre,
          ubicacion: b.ubicacion,
        },
        libros
      );
      setAppHTML(`
        <fieldset>
          <legend>Detalle biblioteca</legend>
          <table><tbody>
            <tr><th>ID</th><td>${bb.bibliotecaId}</td></tr>
            <tr><th>Nombre</th><td>${bb.nombre}</td></tr>
            <tr><th>Ubicación</th><td>${bb.ubicacion ?? "-"}</td></tr>
          </tbody></table>
          <div class="actions">
            <button data-accion="editar" data-entidad="biblioteca" data-id="${
              bb.bibliotecaId
            }">Editar</button>
            <button data-accion="borrar" data-entidad="biblioteca" data-id="${
              bb.bibliotecaId
            }">Borrar</button>
          </div>
        </fieldset>
        ${bb.generarHTMLEdicion()}
      `);
    }
  };
  const renderEditar = (entidad, id) => {
    if (entidad === "autor") {
      const a = buscarAutor(id);
      setAppHTML(a.generarHTMLEdicion());
    } else if (entidad === "libro") {
      const l = buscarLibro(id);
      setAppHTML(l.generarHTMLEdicion());
      rellenarSelectsLibro();
    } else {
      const b = buscarBiblioteca(id);
      const bb = new Biblioteca(
        {
          bibliotecaId: b.bibliotecaId,
          nombre: b.nombre,
          ubicacion: b.ubicacion,
        },
        libros
      );
      setAppHTML(bb.generarHTMLEdicion());
    }
  };

  // Rellenar selects de Libro (autor/biblioteca)
  const rellenarSelectsLibro = () => {
    const form = document.getElementById("form-libro");
    const selAutor = form?.querySelector("select[name=autorId]");
    const selBib = form?.querySelector("select[name=bibliotecaId]");
    if (selAutor)
      selAutor.innerHTML = autores
        .map((a) => `<option value="${a.autorId}">${a.nombre}</option>`)
        .join("");
    if (selBib)
      selBib.innerHTML = bibliotecas
        .map((b) => `<option value="${b.bibliotecaId}">${b.nombre}</option>`)
        .join("");

    // Si estamos editando, preseleccionar
    if (form?.dataset.id) {
      const l = buscarLibro(form.dataset.id);
      if (selAutor) selAutor.value = String(l.autorId);
      if (selBib) selBib.value = String(l.bibliotecaId);
    }
  };

  // Guardar (crear/editar) desde formularios
  const onSubmitForm = (form) => {
    const entidad = form.dataset.entidad;

    if (entidad === "autor") {
      const payload = {
        nombre: form.nombre.value.trim(),
        nacionalidad: form.nacionalidad.value.trim(),
        biografia: form.biografia.value.trim(),
      };
      if (form.dataset.id) {
        const a = buscarAutor(form.dataset.id);
        Object.assign(a, payload);
      } else {
        crearAutor(payload);
      }
      renderListado("autor");
      return;
    }

    if (entidad === "libro") {
      const payload = {
        titulo: form.titulo.value.trim(),
        ISBN: form.ISBN.value.trim(),
        autorId: Number(form.autorId.value),
        bibliotecaId: Number(form.bibliotecaId.value),
      };
      if (form.dataset.id) {
        const l = buscarLibro(form.dataset.id);
        Object.assign(l, payload);
      } else {
        crearLibro(payload);
      }
      renderListado("libro");
      return;
    }

    if (entidad === "biblioteca") {
      const payload = {
        nombre: form.nombre.value.trim(),
        ubicacion: form.ubicacion.value.trim(),
      };
      if (form.dataset.id) {
        const b = buscarBiblioteca(form.dataset.id);
        Object.assign(b, payload);
      } else {
        crearBiblioteca(payload);
      }
      renderListado("biblioteca");
    }
  };

  // Asignación de manejadores (menú, buscador, delegación dentro de #app)
  function asignarManejadores() {
    // Menú superior (si existe en tu index)
    document
      .querySelector(".biblio-autor-listar")
      ?.addEventListener("click", () =>
        setAppHTML(generarHTMLListadoAutores())
      );
    document
      .querySelector(".biblio-libro-listar")
      ?.addEventListener("click", () => setAppHTML(generarHTMLListadoLibros()));
    document
      .querySelector(".biblio-biblioteca-listar")
      ?.addEventListener("click", () =>
        setAppHTML(generarHTMLListadoBibliotecas())
      );

    // Buscador (si existe en tu index)
    document
      .getElementById("form-buscador")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const tipo = e.target.tipo.value;
        const q = e.target.q.value;
        const resultados =
          tipo === "libro"
            ? buscarLibrosPorTitulo(q)
            : autores.filter((a) =>
                a.nombre.toLowerCase().includes(q.trim().toLowerCase())
              );
        setAppHTML(generarHTMLResultadoBuscador(tipo, resultados));
      });

    // Delegación en #app
    const app = $app();
    app.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const accion = btn.dataset.accion;
      const entidad = btn.dataset.entidad;
      const id = btn.dataset.id;

      // Navegación CRUD
      if (accion === "crear") return renderCrear(entidad);
      if (accion === "ver") return renderVer(entidad, id);
      if (accion === "editar") return renderEditar(entidad, id);
      if (accion === "borrar") {
        if (entidad === "autor") borrarAutor(id);
        else if (entidad === "libro") borrarLibro(id);
        else borrarBiblioteca(id);
        renderListado(entidad);
        return;
      }

      // Préstamos
      if (entidad === "libro" && accion === "prestar") {
        const l = buscarLibro(id);
        crearPrestamo(l);
        setAppHTML(l.generarHTMLPropiedades());
        return;
      }
      if (entidad === "libro" && accion === "devolver") {
        const l = buscarLibro(id);
        devolverPrestamo(l);
        setAppHTML(l.generarHTMLPropiedades());
        return;
      }
      if (entidad === "libro" && accion === "listar-prestamos") {
        const l = buscarLibro(id);
        setAppHTML(l.generarHTMLListadoPrestamos());
        return;
      }

      // Autor: añadir/eliminar títulos (no IDs)
      if (entidad === "autor" && accion === "autor-add-libro") {
        const a = buscarAutor(id);
        const input = document.getElementById("autor-libro-titulo");
        const t = input?.value.trim();
        if (t) a.libros.push(t);
        setAppHTML(a.generarHTMLPropiedades());
        return;
      }
      if (entidad === "autor" && accion === "autor-del-libro") {
        const a = buscarAutor(id);
        const t = btn.dataset.titulo;
        a.libros = a.libros.filter((x) => x !== t);
        setAppHTML(a.generarHTMLPropiedades());
        return;
      }
    });

    // Submit de formularios dinámicos
    app.addEventListener("submit", (e) => {
      const form = e.target;
      const entidad = form.dataset.entidad;
      if (!entidad) return;
      e.preventDefault();
      onSubmitForm(form);
    });
  }

  // API pública (como en el enunciado)
  return {
    generarHTMLListadoAutores,
    generarHTMLListadoLibros,
    generarHTMLListadoBibliotecas,
    buscarLibrosPorTitulo,
    buscarLibrosPorAutor,
    generarHTMLResultadoBuscador,
    buscarLibro,
    buscarAutor,
    buscarBiblioteca,
    crearLibro,
    crearAutor,
    crearBiblioteca,
    borrarLibro,
    borrarAutor,
    borrarBiblioteca,
    crearPrestamo,
    devolverPrestamo,
    init: () =>
      setAppHTML("<p>Selecciona una opción del menú o usa el buscador.</p>"),
  };
})();
// Arranque SPA
window.addEventListener("DOMContentLoaded", () => {
  $biblio.init();
});
