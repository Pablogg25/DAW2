import Libro from "./Libro.js";
import Autor from "./Autor.js";
import Biblioteca from "./Biblioteca.js";
import { datosIniciales } from "./datos.js";

const $biblio = (function () {
  const libros = datosIniciales.libros.map((l) => new Libro(l));
  const autores = datosIniciales.autores.map((a) => new Autor(a));
  const bibliotecas = datosIniciales.bibliotecas.map((b) => new Biblioteca(b));

  // Listados
  function generarHTMLListadoAutores() {
    const filas = autores
      .map(
        (a) => `
      <tr>
        <td>${a.autorId}</td>
        <td>${a.nombre}</td>
        <td>${a.nacionalidad}</td>
        <td>
          <button class="biblio-autor-ver" data-id="${a.autorId}">Ver</button>
          <button class="biblio-autor-editar" data-id="${a.autorId}">Editar</button>
          <button class="biblio-autor-borrar" data-id="${a.autorId}">Borrar</button>
        </td>
      </tr>`
      )
      .join("");
    return `
      <h2>Autores</h2>
      <button id="biblio-autor-crear">Crear Autor</button>
      <table class="list-table">
        <thead><tr><th>ID</th><th>Nombre</th><th>Nacionalidad</th><th>Acciones</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>`;
  }
  function generarHTMLListadoBibliotecas() {
    const filas = bibliotecas
      .map(
        (b) => `
      <tr>
        <td>${b.bibliotecaId}</td>
        <td>${b.nombre}</td>
        <td>${b.ubicacion}</td>
        <td>
          <button class="biblio-biblioteca-ver" data-id="${b.bibliotecaId}">Ver</button>
          <button class="biblio-biblioteca-editar" data-id="${b.bibliotecaId}">Editar</button>
          <button class="biblio-biblioteca-borrar" data-id="${b.bibliotecaId}">Borrar</button>
        </td>
      </tr>`
      )
      .join("");
    return `
      <h2>Bibliotecas</h2>
      <button id="biblio-biblioteca-crear">Crear Biblioteca</button>
      <table class="list-table">
        <thead><tr><th>ID</th><th>Nombre</th><th>Ubicación</th><th>Acciones</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>`;
  }
  function generarHTMLListadoLibros() {
    const filas = libros
      .map((l) => {
        const autor = buscarAutor(l.autorId);
        const bib = buscarBiblioteca(l.bibliotecaId);
        return `
        <tr>
          <td>${l.libroId}</td>
          <td>${l.titulo}</td>
          <td>${l.ISBN}</td>
          <td>${autor ? autor.nombre : "-"}</td>
          <td>${bib ? bib.nombre : "-"}</td>
          <td>${l.estaDisponible ? "Disponible" : "Prestado"}</td>
          <td>
            <button class="biblio-libro-ver" data-id="${l.libroId}">Ver</button>
            <button class="biblio-libro-editar" data-id="${
              l.libroId
            }">Editar</button>
            <button class="biblio-libro-borrar" data-id="${
              l.libroId
            }">Borrar</button>
          </td>
        </tr>`;
      })
      .join("");
    return `
      <h2>Libros</h2>
      <button id="biblio-libro-crear">Crear Libro</button>
      <table class="list-table">
        <thead><tr><th>ID</th><th>Título</th><th>ISBN</th><th>Autor</th><th>Biblioteca</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>${filas}</tbody>
      </table>`;
  }
  // buscarLibrosPorTitulo: recibe 'titulo' (puede ser cadena vacía) y devuelve array de instancias Libro
  function buscarLibrosPorTitulo(titulo) {
    if (!titulo || String(titulo).trim() === "") {
      return libros.slice(); // devolver copia de todos los libros
    }
    const q = String(titulo).toLowerCase();
    return libros.filter((l) => String(l.titulo).toLowerCase().includes(q));
  }

  // buscarLibrosPorAutor: recibe 'nombreAutor' (cadena parcial) y devuelve libros cuyos autores coinciden
  function buscarLibrosPorAutor(nombreAutor) {
    if (!nombreAutor || String(nombreAutor).trim() === "") {
      return libros.slice();
    }
    const q = String(nombreAutor).toLowerCase();
    const autoresMatch = autores
      .filter((a) => String(a.nombre).toLowerCase().includes(q))
      .map((a) => Number(a.autorId));
    return libros.filter((l) => autoresMatch.includes(Number(l.autorId)));
  }

  // gestorBiblioteca.js
  function generarHTMLResultadoBuscador(tipo, q) {
    const texto = String(q || "").trim();
    if (String(tipo) === "autor") {
      if (!texto) return autores.slice(); // devuelve todos los autores
      const ql = texto.toLowerCase();
      return autores.filter((a) => String(a.nombre).toLowerCase().includes(ql));
    }
    // por defecto, buscar por libro
    if (!texto) return libros.slice();
    return buscarLibrosPorTitulo(texto);
  }

  // --- Buscar por ID ---
  function buscarLibro(libroId) {
    return libros.find((l) => l.libroId === Number(libroId)) || null;
  }
  function buscarAutor(autorId) {
    return autores.find((a) => a.autorId === Number(autorId)) || null;
  }
  function buscarBiblioteca(bibliotecaId) {
    return (
      bibliotecas.find((b) => b.bibliotecaId === Number(bibliotecaId)) || null
    );
  }
  // --- Crear ---
  function crearLibro(obj) {
    const nuevo = new Libro({
      ...obj,
      libroId: libros.length
        ? Math.max(...libros.map((l) => l.libroId)) + 1
        : 1,
    });
    libros.push(nuevo);
    const autor = buscarAutor(nuevo.autorId);
    if (autor && !autor.libros.includes(nuevo.titulo))
      autor.libros.push(nuevo.titulo);
    return nuevo;
  }
  function crearAutor(obj) {
    const nuevo = new Autor({
      ...obj,
      autorId: autores.length
        ? Math.max(...autores.map((a) => a.autorId)) + 1
        : 1,
    });
    autores.push(nuevo);
    return nuevo;
  }
  function crearBiblioteca(obj) {
    const nuevo = new Biblioteca({
      ...obj,
      bibliotecaId: bibliotecas.length
        ? Math.max(...bibliotecas.map((b) => b.bibliotecaId)) + 1
        : 1,
    });
    bibliotecas.push(nuevo);
    return nuevo;
  }
  function borrarLibro(libroId) {
    const idx = libros.findIndex((l) => l.libroId === Number(libroId));
    if (idx >= 0) {
      const libro = libros.splice(idx, 1)[0];
      const autor = buscarAutor(libro.autorId);
      if (autor) autor.libros = autor.libros.filter((t) => t !== libro.titulo);
      return true;
    }
    return false;
  }
  function borrarAutor(autorId) {
    const idx = autores.findIndex((a) => a.autorId === Number(autorId));
    if (idx >= 0) {
      autores.splice(idx, 1);
      return true;
    }
    return false;
  }
  function borrarBiblioteca(bibliotecaId) {
    const idx = bibliotecas.findIndex(
      (b) => b.bibliotecaId === Number(bibliotecaId)
    );
    if (idx >= 0) {
      bibliotecas.splice(idx, 1);
      return true;
    }
    return false;
  }
  // --- Préstamos ---
  function crearPrestamo(libroId) {
    const libro = buscarLibro(libroId);
    if (!libro || !libro.estaDisponible) return false;
    libro.prestamos.push({
      fechaPrestamo: new Date().toISOString(),
      fechaDevolucion: null,
    });
    return true;
  }
  function devolverPrestamo(libroId) {
    const libro = buscarLibro(libroId);
    if (!libro) return false;
    const ultimo = libro.prestamos
      .slice()
      .reverse()
      .find((p) => !p.fechaDevolucion);
    if (!ultimo) return false;
    ultimo.fechaDevolucion = new Date().toISOString();
    return true;
  }

  return {
    generarHTMLListadoAutores,
    generarHTMLListadoBibliotecas,
    generarHTMLListadoLibros,
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
    devolverPrestamo,
    crearPrestamo,
  };
})();
export default $biblio;
// ---------- INICIALIZADOR SPA (pegar al final de gestorBiblioteca.js) ----------
/*
  Este código se ejecuta al importar gestorBiblioteca.js y conecta la UI:
  - Usa los métodos públicos de $biblio (generarHTMLListado..., buscar..., crear..., borrar..., crearPrestamo(), devolverPrestamo(), buscarLibrosPorTitulo/Autor)
  - Renderiza en #app y gestiona eventos por delegación
  Requisitos: index.html debe tener #app, #menu-autores, #menu-libros, #menu-bibliotecas y #form-buscador (tal y como tienes).
*/
(function initUI() {
  // Evitar ejecución si no estamos en navegador (por ejemplo al testear en Node)
  if (typeof document === "undefined") return;

  const app = document.getElementById("app");
  const btnAutores = document.getElementById("menu-autores");
  const btnLibros = document.getElementById("menu-libros");
  const btnBiblios = document.getElementById("menu-bibliotecas");
  const buscadorForm = document.getElementById("form-buscador");
  const inputBusqueda = document.getElementById("busqueda-text");

  // Render helpers (usamos los métodos $biblio.generarHTMLListado... que debe devolver HTML)
  function render(html) {
    app.innerHTML = html ?? "";
  }

  function mostrarListadoAutores() {
    if (typeof $biblio.generarHTMLListadoAutores === "function") {
      render($biblio.generarHTMLListadoAutores());
    } else {
      // Fallback: construir listado desde colección si hay método listarAutores
      const autores =
        typeof $biblio.listarAutores === "function"
          ? $biblio.listarAutores()
          : [];
      const filas = autores
        .map(
          (a) => `
        <tr>
          <td>${a.autorId}</td><td>${a.nombre}</td><td>${
            a.nacionalidad || ""
          }</td>
          <td>
            <button data-action="ver-autor" data-id="${a.autorId}">Ver</button>
            <button data-action="editar-autor" data-id="${
              a.autorId
            }">Editar</button>
            <button data-action="borrar-autor" data-id="${
              a.autorId
            }">Borrar</button>
          </td>
        </tr>`
        )
        .join("");
      render(`<h2>Autores</h2><button id="crear-autor">Crear Autor</button>
        <table class="list-table"><thead><tr><th>ID</th><th>Nombre</th><th>Nacionalidad</th><th>Acciones</th></tr></thead><tbody>${filas}</tbody></table>`);
    }
  }

  function mostrarListadoBibliotecas() {
    if (typeof $biblio.generarHTMLListadoBibliotecas === "function") {
      render($biblio.generarHTMLListadoBibliotecas());
    } else {
      const biblios =
        typeof $biblio.listarBibliotecas === "function"
          ? $biblio.listarBibliotecas()
          : [];
      const filas = biblios
        .map(
          (b) => `
        <tr>
          <td>${b.bibliotecaId}</td><td>${b.nombre}</td><td>${
            b.ubicacion || ""
          }</td>
          <td>
            <button data-action="ver-biblioteca" data-id="${
              b.bibliotecaId
            }">Ver</button>
            <button data-action="editar-biblioteca" data-id="${
              b.bibliotecaId
            }">Editar</button>
            <button data-action="borrar-biblioteca" data-id="${
              b.bibliotecaId
            }">Borrar</button>
          </td>
        </tr>`
        )
        .join("");
      render(`<h2>Bibliotecas</h2><button id="crear-biblioteca">Crear Biblioteca</button>
        <table class="list-table"><thead><tr><th>ID</th><th>Nombre</th><th>Ubicación</th><th>Acciones</th></tr></thead><tbody>${filas}</tbody></table>`);
    }
  }

  function mostrarListadoLibros() {
    if (typeof $biblio.generarHTMLListadoLibros === "function") {
      render($biblio.generarHTMLListadoLibros());
    } else {
      const libros =
        typeof $biblio.listarLibros === "function"
          ? $biblio.listarLibros()
          : [];
      const filas = libros
        .map(
          (l) => `
        <tr>
          <td>${l.libroId}</td><td>${l.titulo}</td><td>${l.ISBN}</td>
          <td>${l.estaDisponible ? "Disponible" : "Prestado"}</td>
          <td>
            <button data-action="ver-libro" data-id="${l.libroId}">Ver</button>
            <button data-action="editar-libro" data-id="${
              l.libroId
            }">Editar</button>
            <button data-action="borrar-libro" data-id="${
              l.libroId
            }">Borrar</button>
            <button data-action="prestamos-libro" data-id="${
              l.libroId
            }">Préstamos</button>
            <button data-action="prestar-devolver" data-id="${l.libroId}">${
            l.estaDisponible ? "Prestar" : "Devolver"
          }</button>
          </td>
        </tr>`
        )
        .join("");
      render(`<h2>Libros</h2><button id="crear-libro">Crear Libro</button>
        <table class="list-table"><thead><tr><th>ID</th><th>Título</th><th>ISBN</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${filas}</tbody></table>`);
    }
  }

  // Mostrar por defecto listado de libros al arrancar
  mostrarListadoLibros();

  // Conectar menú superior si existen botones
  btnAutores && btnAutores.addEventListener("click", mostrarListadoAutores);
  btnLibros && btnLibros.addEventListener("click", mostrarListadoLibros);
  btnBiblios && btnBiblios.addEventListener("click", mostrarListadoBibliotecas);

  // buscadorForm submit handler (completo)
  buscadorForm &&
    buscadorForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const q =
        inputBusqueda && inputBusqueda.value ? inputBusqueda.value.trim() : "";
      const tipo =
        buscadorForm.querySelector('input[name="tipo-busqueda"]:checked')
          ?.value || "libro";

      // RENDER helpers seguros
      function renderLibros(resultados) {
        if (!resultados || resultados.length === 0) {
          render(
            `<h2>Resultados libros: "${q}"</h2><p class="small">Sin coincidencias</p>`
          );
          return;
        }
        // construimos tabla mostrando autor si es posible
        render(
          `<h2>Resultados libros: "${q}"</h2>
        <table class="list-table">
          <thead><tr><th>ID</th><th>Título</th><th>ISBN</th><th>Autor</th><th>Acciones</th></tr></thead>
          <tbody>${resultados
            .map((l) => {
              const autor =
                typeof $biblio.buscarAutor === "function"
                  ? $biblio.buscarAutor(l.autorId)
                  : null;
              return `<tr>
                <td>${l.libroId ?? ""}</td>
                <td>${l.titulo ?? ""}</td>
                <td>${l.ISBN ?? ""}</td>
                <td class="small">${autor ? autor.nombre : "-"}</td>
                <td><button data-action="ver-libro" data-id="${
                  l.libroId
                }" class="btn">Ver</button></td>
              </tr>`;
            })
            .join("")}
          </tbody>
        </table>`
        );
      }

      function renderAutores(resultados) {
        if (!resultados || resultados.length === 0) {
          render(
            `<h2>Resultados autores: "${q}"</h2><p class="small">Sin coincidencias</p>`
          );
          return;
        }
        render(
          `<h2>Resultados autores: "${q}"</h2>
        <table class="list-table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Nacionalidad</th><th>Acciones</th></tr></thead>
          <tbody>${resultados
            .map(
              (a) => `<tr>
              <td>${a.autorId ?? ""}</td>
              <td>${a.nombre ?? ""}</td>
              <td class="small">${a.nacionalidad ?? ""}</td>
              <td>
                <button data-action="ver-autor" data-id="${
                  a.autorId
                }" class="btn">Ver</button>
                <button data-action="editar-autor" data-id="${
                  a.autorId
                }" class="btn">Editar</button>
              </td>
            </tr>`
            )
            .join("")}
          </tbody>
        </table>`
        );
      }

      if (tipo === "libro") {
        // Preferimos buscarLibrosPorTitulo si existe; fallback a generarHTMLResultadoBuscador
        const resultados =
          typeof $biblio.buscarLibrosPorTitulo === "function"
            ? $biblio.buscarLibrosPorTitulo(q)
            : typeof $biblio.generarHTMLResultadoBuscador === "function"
            ? $biblio.generarHTMLResultadoBuscador("libro", q)
            : [];
        renderLibros(Array.isArray(resultados) ? resultados : []);
      } else {
        // Tipo "autor": pedimos autores, no libros
        const resultados =
          // preferir función específica para autores si existe
          typeof $biblio.generarHTMLResultadoBuscador === "function"
            ? $biblio.generarHTMLResultadoBuscador("autor", q)
            : typeof $biblio.buscarAutores === "function"
            ? $biblio.buscarAutores(q)
            : typeof $biblio.listarAutores === "function"
            ? (function () {
                const all = $biblio.listarAutores();
                if (!q) return all.slice();
                const qq = q.toLowerCase();
                return all.filter((a) =>
                  String(a.nombre || "")
                    .toLowerCase()
                    .includes(qq)
                );
              })()
            : [];

        renderAutores(Array.isArray(resultados) ? resultados : []);
      }
    });

  // Delegación de eventos sobre #app
  app.addEventListener("click", (ev) => {
    const btn = ev.target.closest("button");
    if (!btn) return;

    const action = btn.dataset.action || btn.id || null;
    const id = btn.dataset.id;

    // Crear formas: si el gestor no genera templates, creamos formularios simples aquí
    if (
      btn.id === "crear-autor" ||
      action === "crear-autor" ||
      btn.id === "biblio-autor-crear"
    ) {
      render(`<h2>Crear Autor</h2>
        <form id="form-crear-autor">
          <label>Nombre<br><input name="nombre" required></label><br>
          <label>Nacionalidad<br><input name="nacionalidad"></label><br>
          <label>Biografía<br><textarea name="biografia"></textarea></label><br>
          <button type="submit" class="btn">Crear</button>
          <button type="button" data-action="cancel" class="btn">Cancelar</button>
        </form>`);
      return;
    }

    if (
      btn.id === "crear-biblioteca" ||
      action === "crear-biblioteca" ||
      btn.id === "biblio-biblioteca-crear"
    ) {
      render(`<h2>Crear Biblioteca</h2>
        <form id="form-crear-biblioteca">
          <label>Nombre<br><input name="nombre" required></label><br>
          <label>Ubicación<br><input name="ubicacion"></input></label><br>
          <button type="submit" class="btn">Crear</button>
          <button type="button" data-action="cancel" class="btn">Cancelar</button>
        </form>`);
      return;
    }

    if (
      btn.id === "crear-libro" ||
      action === "crear-libro" ||
      btn.id === "biblio-libro-crear"
    ) {
      // recoger listas para selects si el gestor ofrece listados
      const autoresList =
        typeof $biblio.listarAutores === "function"
          ? $biblio.listarAutores()
          : typeof $biblio._listarInterno === "function"
          ? $biblio._listarInterno().autores
          : [];
      const bibliosList =
        typeof $biblio.listarBibliotecas === "function"
          ? $biblio.listarBibliotecas()
          : typeof $biblio._listarInterno === "function"
          ? $biblio._listarInterno().bibliotecas
          : [];
      const optsAutores = (autoresList || [])
        .map((a) => `<option value="${a.autorId}">${a.nombre}</option>`)
        .join("");
      const optsBibs = (bibliosList || [])
        .map((b) => `<option value="${b.bibliotecaId}">${b.nombre}</option>`)
        .join("");
      render(`<h2>Crear Libro</h2>
        <form id="form-crear-libro">
          <label>Título<br><input name="titulo" required></label><br>
          <label>ISBN<br><input name="ISBN"></label><br>
          <label>Autor<br><select name="autorId" required><option value="">--Selecciona--</option>${optsAutores}</select></label><br>
          <label>Biblioteca<br><select name="bibliotecaId" required><option value="">--Selecciona--</option>${optsBibs}</select></label><br>
          <button type="submit" class="btn">Crear</button>
          <button type="button" data-action="cancel" class="btn">Cancelar</button>
        </form>`);
      return;
    }

    // Ver / Edit / Borrar autores
    if (action === "ver-autor") {
      const autor =
        typeof $biblio.buscarAutor === "function"
          ? $biblio.buscarAutor(id)
          : null;
      if (!autor) return;
      if (typeof autor.generarHTMLPropiedades === "function") {
        render(autor.generarHTMLPropiedades());
      } else {
        render(
          `<h2>${autor.nombre}</h2><pre>${JSON.stringify(autor, null, 2)}</pre>`
        );
      }
      return;
    }
    if (action === "editar-autor") {
      const autor =
        typeof $biblio.buscarAutor === "function"
          ? $biblio.buscarAutor(id)
          : null;
      if (!autor) return;
      // intentar usar método de la instancia si existe
      if (typeof autor.generarHTMLEdicion === "function") {
        render(autor.generarHTMLEdicion());
      } else {
        render(`<h2>Editar Autor</h2>
          <form id="form-editar-autor" data-id="${autor.autorId}">
            <label>Nombre<br><input name="nombre" value="${
              autor.nombre
            }" required></label><br>
            <label>Nacionalidad<br><input name="nacionalidad" value="${
              autor.nacionalidad || ""
            }"></label><br>
            <label>Biografía<br><textarea name="biografia">${
              autor.biografia || ""
            }</textarea></label><br>
            <button type="submit" class="btn">Guardar</button>
            <button type="button" data-action="cancel" class="btn">Cancelar</button>
          </form>`);
      }
      return;
    }
    if (action === "borrar-autor") {
      if (!confirm || !confirm("¿Borrar autor?")) return;
      const ok =
        typeof $biblio.borrarAutor === "function"
          ? $biblio.borrarAutor(id)
          : false;
      if (!ok) alert("No se pudo borrar (puede tener restricciones)");
      // refrescar listas
      mostrarListadoAutores();
      return;
    }

    // Ver / Edit / Borrar bibliotecas
    if (action === "ver-biblioteca") {
      const b =
        typeof $biblio.buscarBiblioteca === "function"
          ? $biblio.buscarBiblioteca(id)
          : null;
      if (!b) return;
      // mostrar libros asignados (si existe función para listar)
      const librosAll =
        typeof $biblio.listarLibros === "function"
          ? $biblio.listarLibros()
          : typeof $biblio._listarInterno === "function"
          ? $biblio._listarInterno().libros
          : [];
      const librosAsignados = (librosAll || []).filter(
        (lb) => Number(lb.bibliotecaId) === Number(id)
      );
      render(`<h2>${b.nombre}</h2><p><strong>Ubicación:</strong> ${
        b.ubicacion
      }</p>
        <h3>Libros asignados</h3>
        <ul>${
          librosAsignados.length
            ? librosAsignados
                .map((l) => `<li>${l.titulo} (ID:${l.libroId})</li>`)
                .join("")
            : "<li>Sin libros</li>"
        }</ul>
        <p><button data-action="volver-lista" class="btn">Volver</button></p>`);
      return;
    }
    if (action === "editar-biblioteca") {
      const b =
        typeof $biblio.buscarBiblioteca === "function"
          ? $biblio.buscarBiblioteca(id)
          : null;
      if (!b) return;
      if (typeof b.generarHTMLEdicion === "function") {
        render(b.generarHTMLEdicion());
      } else {
        render(`<h2>Editar Biblioteca</h2>
          <form id="form-editar-biblioteca" data-id="${b.bibliotecaId}">
            <label>Nombre<br><input name="nombre" value="${
              b.nombre
            }" required></label><br>
            <label>Ubicación<br><input name="ubicacion" value="${
              b.ubicacion || ""
            }"></label><br>
            <button type="submit" class="btn">Guardar</button>
            <button type="button" data-action="cancel" class="btn">Cancelar</button>
          </form>`);
      }
      return;
    }
    if (action === "borrar-biblioteca") {
      if (!confirm || !confirm("¿Borrar biblioteca?")) return;
      const ok =
        typeof $biblio.borrarBiblioteca === "function"
          ? $biblio.borrarBiblioteca(id)
          : false;
      if (!ok) alert("No se pudo borrar (puede tener libros asignados)");
      mostrarListadoBibliotecas();
      return;
    }

    // Ver / Edit / Borrar libros
    if (action === "ver-libro") {
      const l =
        typeof $biblio.buscarLibro === "function"
          ? $biblio.buscarLibro(id)
          : null;
      if (!l) return;
      const autor =
        typeof $biblio.buscarAutor === "function"
          ? $biblio.buscarAutor(l.autorId)
          : null;
      const bib =
        typeof $biblio.buscarBiblioteca === "function"
          ? $biblio.buscarBiblioteca(l.bibliotecaId)
          : null;
      if (typeof l.generarHTMLPropiedades === "function")
        render(l.generarHTMLPropiedades($biblio));
      else
        render(`<h2>${l.titulo}</h2><pre>${JSON.stringify(l, null, 2)}</pre>`);
      return;
    }
    if (action === "editar-libro") {
      const l =
        typeof $biblio.buscarLibro === "function"
          ? $biblio.buscarLibro(id)
          : null;
      if (!l) return;
      // intentar usar método de la instancia para formulario de edición si existe
      if (typeof l.generarHTMLEdicion === "function") {
        const autoresList =
          typeof $biblio.listarAutores === "function"
            ? $biblio.listarAutores()
            : typeof $biblio._listarInterno === "function"
            ? $biblio._listarInterno().autores
            : [];
        const bibliosList =
          typeof $biblio.listarBibliotecas === "function"
            ? $biblio.listarBibliotecas()
            : typeof $biblio._listarInterno === "function"
            ? $biblio._listarInterno().bibliotecas
            : [];
        // algunas implementaciones requieren pasar listas; intentamos ambas firmas
        try {
          render(l.generarHTMLEdicion(autoresList, bibliosList));
        } catch (e) {
          render(l.generarHTMLEdicion());
        }
      } else {
        render(`<h2>Editar Libro</h2>
          <form id="form-editar-libro" data-id="${l.libroId}">
            <label>Título<br><input name="titulo" value="${l.titulo}" required></label><br>
            <label>ISBN<br><input name="ISBN" value="${l.ISBN}"></label><br>
            <label>Autor (ID)<br><input name="autorId" value="${l.autorId}" required></label><br>
            <label>Biblioteca (ID)<br><input name="bibliotecaId" value="${l.bibliotecaId}" required></label><br>
            <button type="submit" class="btn">Guardar</button>
            <button type="button" data-action="cancel" class="btn">Cancelar</button>
          </form>`);
      }
      return;
    }
    if (action === "borrar-libro") {
      if (!confirm || !confirm("¿Borrar libro?")) return;
      typeof $biblio.borrarLibro === "function" && $biblio.borrarLibro(id);
      mostrarListadoLibros();
      return;
    }
    if (action === "prestamos-libro") {
      const l =
        typeof $biblio.buscarLibro === "function"
          ? $biblio.buscarLibro(id)
          : null;
      if (!l) return;
      if (typeof l.generarHTMLListadoPrestamos === "function")
        render(`<h2>Préstamos</h2>${l.generarHTMLListadoPrestamos()}`);
      else render(`<pre>${JSON.stringify(l.prestamos || [], null, 2)}</pre>`);
      return;
    }
    if (action === "prestar-devolver") {
      const l =
        typeof $biblio.buscarLibro === "function"
          ? $biblio.buscarLibro(id)
          : null;
      if (!l) return;
      if (l.estaDisponible) {
        const res =
          typeof $biblio.crearPrestamo === "function"
            ? $biblio.crearPrestamo(l.libroId)
            : { ok: false, message: "Sin método crearPrestamo" };
        if (res && res.ok === false) alert(res.message || "No pudo prestarse");
      } else {
        const res =
          typeof $biblio.devolverPrestamo === "function"
            ? $biblio.devolverPrestamo(l.libroId)
            : { ok: false, message: "Sin método devolverPrestamo" };
        if (res && res.ok === false) alert(res.message || "No pudo devolverse");
      }
      mostrarListadoLibros();
      return;
    }

    // volver lista genérico
    if (action === "volver-lista") {
      mostrarListadoLibros();
      return;
    }
  });

  // Delegación para formularios inyectados en #app
  app.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const form = ev.target;

    // Crear autor
    if (form.id === "form-crear-autor") {
      const fd = new FormData(form);
      const data = {
        nombre: fd.get("nombre"),
        nacionalidad: fd.get("nacionalidad"),
        biografia: fd.get("biografia"),
        libros: [],
      };
      typeof $biblio.crearAutor === "function" && $biblio.crearAutor(data);
      mostrarListadoAutores();
      return;
    }

    // Editar autor
    if (form.id === "form-editar-autor") {
      const id = form.dataset.id;
      const autor =
        typeof $biblio.buscarAutor === "function"
          ? $biblio.buscarAutor(id)
          : null;
      if (!autor) return;
      const fd = new FormData(form);
      autor.nombre = fd.get("nombre");
      autor.nacionalidad = fd.get("nacionalidad");
      autor.biografia = fd.get("biografia");
      // si tienes método actualizarAutor úsalo en lugar de modificar directamente
      if (typeof $biblio.actualizarAutor === "function")
        $biblio.actualizarAutor(autor.autorId, {
          nombre: autor.nombre,
          nacionalidad: autor.nacionalidad,
          biografia: autor.biografia,
        });
      mostrarListadoAutores();
      return;
    }

    // Crear biblioteca
    if (form.id === "form-crear-biblioteca") {
      const fd = new FormData(form);
      const data = { nombre: fd.get("nombre"), ubicacion: fd.get("ubicacion") };
      typeof $biblio.crearBiblioteca === "function" &&
        $biblio.crearBiblioteca(data);
      mostrarListadoBibliotecas();
      return;
    }

    // Editar biblioteca
    if (form.id === "form-editar-biblioteca") {
      const id = form.dataset.id;
      const b =
        typeof $biblio.buscarBiblioteca === "function"
          ? $biblio.buscarBiblioteca(id)
          : null;
      if (!b) return;
      const fd = new FormData(form);
      b.nombre = fd.get("nombre");
      b.ubicacion = fd.get("ubicacion");
      if (typeof $biblio.actualizarBiblioteca === "function")
        $biblio.actualizarBiblioteca(b.bibliotecaId, {
          nombre: b.nombre,
          ubicacion: b.ubicacion,
        });
      mostrarListadoBibliotecas();
      return;
    }

    // Crear libro
    if (form.id === "form-crear-libro") {
      const fd = new FormData(form);
      const data = {
        titulo: fd.get("titulo"),
        ISBN: fd.get("ISBN"),
        autorId: Number(fd.get("autorId")),
        bibliotecaId: Number(fd.get("bibliotecaId")),
        prestamos: [],
      };
      typeof $biblio.crearLibro === "function" && $biblio.crearLibro(data);
      mostrarListadoLibros();
      return;
    }

    // Editar libro
    if (form.id === "form-editar-libro") {
      const id = form.dataset.id;
      const libro =
        typeof $biblio.buscarLibro === "function"
          ? $biblio.buscarLibro(id)
          : null;
      if (!libro) return;
      const fd = new FormData(form);
      libro.titulo = fd.get("titulo");
      libro.ISBN = fd.get("ISBN");
      libro.autorId = Number(fd.get("autorId"));
      libro.bibliotecaId = Number(fd.get("bibliotecaId"));
      if (typeof $biblio.actualizarLibro === "function")
        $biblio.actualizarLibro(libro.libroId, {
          titulo: libro.titulo,
          ISBN: libro.ISBN,
          autorId: libro.autorId,
          bibliotecaId: libro.bibliotecaId,
        });
      mostrarListadoLibros();
      return;
    }
  });

  // Exponer funciones útiles en window para depuración (opcional)
  try {
    window.$biblio = $biblio;
  } catch (e) {
    /* noop si no se puede */
  }
})();
