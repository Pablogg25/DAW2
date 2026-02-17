const BASE_URL = "http://127.0.0.1:8000";

// CLASIFICACIÓN
async function cargarClasificacion() {
  const cont = document.getElementById("clasificacion");
  cont.innerHTML = "";

  const tabla = document.createElement("table");

  const header = document.createElement("tr");
  ["Pos", "Equipo", "PJ", "PG", "PP"].forEach((t) => {
    const th = document.createElement("th");
    th.textContent = t;
    header.appendChild(th);
  });
  tabla.appendChild(header);

  const res = await fetch(`${BASE_URL}/clasificacion`);
  const data = await res.json();

  data.forEach((item, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${item.nombre}</td>
      <td>${item.partidosJugados}</td>
      <td>${item.victorias}</td>
      <td>${item.derrotas}</td>
    `;

    tr.addEventListener("click", () => {
      alert(
        `Equipo: ${item.equipo}
PJ: ${item.partidos_jugados}
PG: ${item.partidos_ganados}
PP: ${item.partidos_perdidos}`,
      );
    });

    tabla.appendChild(tr);
  });

  cont.appendChild(tabla);
}

// EQUIPOS
async function cargarEquipos() {
  const contenedor = document.getElementById("equipos");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");
  const header = document.createElement("tr");
  ["Nombre", "Ciudad", "Entrenador"].forEach((t) => {
    const th = document.createElement("th");
    th.textContent = t;
    header.appendChild(th);
  });

  tabla.appendChild(header);
  const res = await fetch(`${BASE_URL}/equipos`);
  const data = await res.json();

  data.forEach((e) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${e.nombre}</td>
    <td>${e.ciudad}</td>
    <td>${e.entrenador}</td>`;
    tabla.appendChild(tr);
  });
  contenedor.appendChild(tabla);
}

async function getNombreEquipo(id) {
  let data;
  const response = await fetch(BASE_URL + `/equipos/${id}`);
  if (response.ok) {
    data = await response.json();
  }
  return data.nombre;
}
async function eliminarPartido(id) {
  const resultado = confirm("¿Seguro que lo quieres eliminar?");
  if (resultado) {
    const response = await fetch(BASE_URL + `/partidos/${id}`, {
      method: "DELETE",
    });
    cargarPartidos();
    return true;
  }

  return false;
}
// Partidos
async function cargarPartidos() {
  const contenedor = document.getElementById("partidos");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");
  const header = document.createElement("tr");
  [
    "Fecha",
    "Equipo Local",
    "Puntos Local",
    "Equipo Visitante",
    "Puntos Visitante",
    "Acciones",
  ].forEach((t) => {
    const th = document.createElement("th");
    th.textContent = t;
    header.appendChild(th);
  });

  tabla.appendChild(header);

  const res = await fetch(`${BASE_URL}/partidos`);
  console.log(res);
  const data = await res.json();
  console.log(data);

  for (const p of data) {
    const tr = document.createElement("tr");
    const nombreEquipoLocal = await getNombreEquipo(p.equipoLocalId);
    const nombreEquipoVisitante = await getNombreEquipo(p.equipoLocalId);
    // console.log(nombreEquipoLocal);
    tr.innerHTML = `
    <td>${p.fecha}</td>
    <td>${nombreEquipoLocal}</td>
    <td>${p.puntosLocal}</td>
    <td>${nombreEquipoVisitante}</td>
    <td>${p.puntosVisitante}</td>`;
    const tdAcciones = document.createElement("td");
    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver";
    btnVer.addEventListener("click", () => {
      window.location.href = `./FormularioPartidos.html?partidoId=${p.partidoId}`;
    });
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
      //   console.log(p.id);
      eliminarPartido(p.partidoId);
    });
    tdAcciones.appendChild(btnVer);
    tdAcciones.appendChild(btnEliminar);
    tr.append(tdAcciones);
    tabla.appendChild(tr);
  }

  contenedor.appendChild(tabla);
}
// INIT
cargarClasificacion();
cargarEquipos();
cargarPartidos();
