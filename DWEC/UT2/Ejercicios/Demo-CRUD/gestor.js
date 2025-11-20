import datos from "./datos.js";

class GestorTareas {
  #tareas;
  constructor() {
    this.#tareas = datos;
  }

  #siguienteTareaId() {}

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
        <div>${t.compleatada}</div>
        <div><button data-accion="ver">Ver</button data-accion="borrar"><button>Borrar</button></div>
      </div>`;
    });
    resultado += `</div>`;
    return resultado;
  }

  generarHTMLFormulario(tareaId = 0) {}

  borrarTarea(tareaId) {
    let indice = this.#tareas.filter((x) => x.tareaId == tareaId);
    if (indice != -1) {
      this.#tareas.splice(indice, 1);
    }
  }

  crearTarea(titulo, duracion, completada) {}

  editarTarea(tareaId, titulo, duracion, completada) {}
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

      $gestor.borrar(entidadId);
      nuevoHTML = $gestor.generarHTMLListado();
      break;
    case "guardar":
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
