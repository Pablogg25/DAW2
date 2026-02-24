import API from "./api.js";

let clientes = [];
let clienteEditando = null;

cargar();

async function cargar() {
  clientes = await API.getClientes();
  pintar();
}

function pintar() {
  const contenedor = document.getElementById("contenedor");

  contenedor.innerHTML += tabla();
  contenedor.innerHTML += formularioCrear();
}

function tabla() {
  let html = `
    <div class="tabla">
      <div class="fila cabecera">
        <div>Nombre</div>
        <div>Teléfono</div>
        <div>Tipo</div>
        <div>Activo</div>
        <div>Acciones</div>
      </div>
  `;

  clientes.forEach((c) => {
    html += `
      <div class="fila">
        <div>${c.nombre} ${c.apellidos}</div>
        <div>${c.telefono}</div>
        <div>${c.tipoCliente}</div>
        <div>${c.activo ? "Sí" : "No"}</div>
        <div>
          <button class="editar" data-id="${c.id}">Editar</button>
          <button class="borrar" data-id="${c.id}">Borrar</button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

function formularioCrear() {
  return `
    <h2>Crear cliente</h2>
    <form id="formCrear">
      <input name="nombre" placeholder="Nombre" required />
      <input name="apellidos" placeholder="Apellidos" required />
      <input name="telefono" placeholder="Teléfono" required />
      <input name="altura" type="number" placeholder="Altura" required />

      <select name="tipoCliente" required>
        <option value="">Tipo...</option>
        <option value="completo">Completo</option>
        <option value="basico">Básico</option>
        <option value="avanzado">Avanzado</option>
      </select>

      <label>
        Activo
        <input type="checkbox" name="activo" checked />
      </label>

      <input name="fechaNacimiento" type="date" required />

      <button>Crear</button>
    </form>`;
}
