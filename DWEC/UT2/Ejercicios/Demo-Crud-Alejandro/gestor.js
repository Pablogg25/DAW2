import datos from "./datos.js";

class GestorTareas {
  #tareas;
  constructor() {
    this.#tareas = datos;
  }

  #siguienteTareaId() {
    let resultado = Math.max(0, ...this.#tareas.map((t) => t.tareaId));
    return resultado + 1;
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
  /**
   *Permite editar o crear
   *
   */
  generarHTMLFormulario(tareaId = 0) {
    let titulo = "";
    let duracion = "";
    let completada = "";
    if (tareaId !== 0) {
      let tarea = this.#tareas.find((t) => t.tareaId == tareaId)[0];
      titulo = tarea.titulo;
      duracion = tarea.duracion;
      completada = tarea.completada ? "checked" : "";
    }
    let resultado = `<form>
      <input type="hidden" name="tareaId" id="tareaId" value="${tareaId}" />
      <div>
        <label for="titulo">${titulo}</label>
        <input type="text" id="titulo" name="titulo" value="${titulo}" />
      </div>
      <div>
        <label for="duracion">${duracion}</label>
        <input type="number" id="duracion" name="duracion" value="${duracion}" />
      </div>
      <div>
        <label for="completada">Completada</label>
        <input type="checkbox" id="completada" name="completada" ${completada} />
      </div>
      <div><button type="button" data-accion="guardar">Guardar</button></div>
    </form>`;
    return resultado;
  }

  borrarTarea(tareaId) {
    let indice = this.#tareas.findIndex((x) => x.tareaId == tareaId);
    if (indice !== -1) {
      this.#tareas.splice(indice, 1);
    }
  }

  crearTarea(titulo, duracion, completada) {
    let nueva = {
      tareaId: this.#siguienteTareaId(),
      titulo: titulo,
      duracion: titulo,
      completada: titulo,
    };
    this.#tareas.push(nueva);
  }

  editarTarea(tareaId, titulo, duracion, completada) {
    let indice = this.#tareas.findIndex((t) => t.tareaId == tareaId);
    if (indice != -1) {
      let tarea = this.#tareas[indice];
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
      let formulario = boton.closest("form");
      let fd = new FormData(formulario);
      const inputTareaId = fd.get("tareaId");
      const inputTitulo = fd.get("titulo");
      const inputDuracion = fd.get("duracion");
      const inputCompletada = fd.get("completada") == on ? "true" : "false";
      if (inputTareaId == 0) {
        $gestor.crearTarea(inputTitulo, inputDuracion, inputCompletada);
      } else {
        $gestor.editarTarea(
          inputTareaId,
          inputTitulo,
          inputDuracion,
          inputCompletada
        );
      }
      nuevoHTML = $gestor.generarHTMLListado();
      break;

    case "ver":
      fila = boton.closest("[data-entidadId], [data-entidadid]");
      entidadId = parseInt(
        fila.dataset["entidadId"] ?? fila.dataset["entidadid"]
      );
      nuevoHTML = $gestor.generarHTMLFormulario();
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
