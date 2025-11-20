import datos from "./datos.js";

class GestorTareas {
  #tareas;
  constructor() {
    this.#tareas = datos;
  }

  #siguienteTareaId() {
    if (this.#tareas.length === 0) return 1;
    return Math.max(...this.#tareas.map((t) => t.tareaId)) + 1;
  }

  generarHTMLListado() {
    let resultado = `
    <div class="tabla">
      <div class="fila cabecera">
        <div>ID</div>
        <div>TITULO</div>
        <div>DURACION</div>
        <div>COMPLETADA</div>
        <div><button data-accion="crear">Crear</button></div>
      </div>`;
    this.#tareas.forEach((t) => {
      resultado += `
      <div class="fila" data-entidadId="${t.tareaId}">
        <div>${t.tareaId}</div>
        <div>${t.titulo}</div>
        <div>${t.duracion}</div>
        <div>${t.completada}</div>
        <div><button data-accion="ver">Ver</button><button data-accion="borrar">Borrar</button></div>
      </div>`;
    });
    resultado += `</div>`;
    return resultado;
  }

  generarHTMLFormulario(tareaId = 0) {
    const tarea = this.#tareas.find((t) => t.tareaId == tareaId);
    const titulo = tarea ? tarea.titulo : "";
    const duracion = tarea ? tarea.duracion : "";
    const completada = tarea ? tarea.completada : false;

    return `<form>
    <input type="hidden" name="tareaId" id="tareaId" value="${
      tarea ? tarea.tareaId : ""
    }" />
    <div>
      <label for="titulo">Titulo</label>
      <input type="text" id="titulo" name="titulo" value="${titulo}" />
    </div>
    <div>
      <label for="duracion">Duracion</label>
      <input type="number" id="duracion" name="duracion" value="${duracion}" />
    </div>
    <div>
      <label for="completada">Completada</label>
      <input type="checkbox" id="completada" name="completada" ${
        completada ? "checked" : ""
      } />
    </div>
    <div><button type="button" data-accion="guardar">Guardar</button></div>
  </form>`;
  }

  borrarTarea(tareaId) {
    let indice = this.#tareas.findIndex((x) => x.tareaId == tareaId);
    if (indice !== -1) {
      this.#tareas.splice(indice, 1);
    }
  }

  crearTarea(titulo, duracion, completada) {
    const nueva = {
      tareaId: this.#siguienteTareaId(),
      titulo,
      duracion,
      completada,
    };
    this.#tareas.push(nueva);
  }

  editarTarea(tareaId, titulo, duracion, completada) {
    const tarea = this.#tareas.find((t) => t.tareaId == tareaId);
    if (tarea) {
      tarea.titulo = titulo;
      tarea.duracion = duracion;
      tarea.completada = completada;
    }
  }
}
/* Codigo auxiliar de intefaz del usuario */

// Busca los elementos con data-accion y los asigno gestionarClick
function asignarManejadores() {
  let disparadores = document.querySelectorAll("[data-accion]");
  disparadores.forEach((c) => {
    c.addEventListener("click", gestionarClick);
  });
}

/* Localizo accion, entidadId,
    Genero CRUD si es necesario,
    Genero codigo HTML
    Reasigno manejadores
*/
function gestionarClick(evento) {
  const boton = evento.currentTarget;
  const accion = boton.dataset["accion"];
  let nuevoHTML = "";
  let fila;
  let entidadId;

  switch (accion) {
    case "crear":
      nuevoHTML = $gestor.generarHTMLFormulario();
      break;

    case "borrar":
      let borrar = confirm("¿Eliminar Tarea?");
      if (borrar === false) {
        return;
      }
      // Busca el mas cercano | [data-entidadid] Tambien funciona
      fila = boton.closest("[data-entidadId], [data-entidadid]");
      entidadId = parseInt(
        fila.dataset["entidadId"] ?? fila.dataset["entidadid"]
      );

      $gestor.borrarTarea(entidadId);
      nuevoHTML = $gestor.generarHTMLListado();
      break;

    case "guardar":
      const idInput = document.getElementById("tareaId");
      const id = idInput && idInput.value ? parseInt(idInput.value) : 0;
      const titulo = document.getElementById("titulo").value;
      const completada = document.getElementById("completada").checked;
      const duracion = parseInt(document.getElementById("duracion").value);
      if (id) {
        $gestor.editarTarea(id, titulo, duracion, completada);
      } else {
        $gestor.crearTarea(titulo, duracion, completada);
      }
      nuevoHTML = $gestor.generarHTMLListado();
      break;

    case "ver":
      fila = boton.closest("[data-entidadId],[data-entidadid]");
      entidadId = parseInt(
        fila.dataset["entidadId"] ?? fila.dataset["entidadid"]
      );
      nuevoHTML = $gestor.generarHTMLFormulario(entidadId);
      break;

    default:
      console.log("Accion no contemplada", accion);
      return;
  }
  $contenedor.innerHTML = nuevoHTML;
  asignarManejadores();
}

/* Codigo de inicializacion */

let $contenedor;
let $gestor;

window.addEventListener("load", () => {
  //   alert("hola");
  $contenedor = document.querySelector(".contenedor");
  $gestor = new GestorTareas();

  $contenedor.innerHTML = $gestor.generarHTMLListado();
  asignarManejadores();
});
