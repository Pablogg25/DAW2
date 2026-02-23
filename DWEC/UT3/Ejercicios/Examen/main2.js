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
  contenedor.innerHTML = "";

  contenedor.innerHTML += tabla();
  contenedor.innerHTML += formularioCrear();

  if (clienteEditando) {
    contenedor.innerHTML += formularioEditar(clienteEditando);
  }

  activarEventos();
}

// -----------------------------
// TABLA
// -----------------------------
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

  for (let c of clientes) {
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
  }

  html += `</div>`;
  return html;
}

// -----------------------------
// FORMULARIO CREAR
// -----------------------------
function formularioCrear() {
  return `
    <h3>Crear cliente</h3>
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

      <label>Activo <input type="checkbox" name="activo" checked /></label>

      <input name="fechaNacimiento" type="date" required />

      <button>Crear</button>
    </form>
  `;
}

// -----------------------------
// FORMULARIO EDITAR
// -----------------------------
function formularioEditar(c) {
  return `
    <h3>Editar cliente</h3>
    <form id="formEditar">
      <input name="nombre" value="${c.nombre}" required />
      <input name="apellidos" value="${c.apellidos}" required />
      <input name="telefono" value="${c.telefono}" required />
      <input name="altura" type="number" value="${c.altura}" required />

      <select name="tipoCliente" required>
        <option value="completo" ${c.tipoCliente === "completo" ? "selected" : ""}>Completo</option>
        <option value="basico" ${c.tipoCliente === "basico" ? "selected" : ""}>Básico</option>
        <option value="avanzado" ${c.tipoCliente === "avanzado" ? "selected" : ""}>Avanzado</option>
      </select>

      <label>Activo <input type="checkbox" name="activo" ${c.activo ? "checked" : ""} /></label>

      <input name="fechaNacimiento" type="date" value="${c.fechaNacimiento}" required />

      <button>Guardar</button>
    </form>
  `;
}

// -----------------------------
// EVENTOS
// -----------------------------
function activarEventos() {
  // CREAR
  const formCrear = document.getElementById("formCrear");
  formCrear.addEventListener("submit", async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);

    const nuevo = {
      nombre: f.get("nombre"),
      apellidos: f.get("apellidos"),
      telefono: f.get("telefono"),
      altura: Number(f.get("altura")),
      tipoCliente: f.get("tipoCliente"),
      activo: f.get("activo") === "on",
      fechaNacimiento: f.get("fechaNacimiento"),
    };

    await API.crearCliente(nuevo);
    cargar();
  });

  // EDITAR (botones)
  document.querySelectorAll(".editar").forEach((btn) => {
    btn.addEventListener("click", () => {
      clienteEditando = clientes.find((c) => c.id == btn.dataset.id);
      pintar();
    });
  });

  // GUARDAR EDICIÓN
  const formEditar = document.getElementById("formEditar");
  if (formEditar) {
    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);

      const actualizado = {
        nombre: f.get("nombre"),
        apellidos: f.get("apellidos"),
        telefono: f.get("telefono"),
        altura: Number(f.get("altura")),
        tipoCliente: f.get("tipoCliente"),
        activo: f.get("activo") === "on",
        fechaNacimiento: f.get("fechaNacimiento"),
      };

      await API.actualizarCliente(clienteEditando.id, actualizado);
      clienteEditando = null;
      cargar();
    });
  }

  // BORRAR
  document.querySelectorAll(".borrar").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await API.borrarCliente(btn.dataset.id);
      cargar();
    });
  });
}
