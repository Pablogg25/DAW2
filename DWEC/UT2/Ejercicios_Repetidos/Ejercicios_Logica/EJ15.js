let trabajadores = [
  { codigo: "E01", nombre: "Lucía", categoria: 1, contratacion: 2020 },
  { codigo: "E02", nombre: "Carlos", categoria: 3, contratacion: 2018 },
  { codigo: "E03", nombre: "María", categoria: 2, contratacion: 2019 },
];

let siguienteCodigo = 4;

//Funciones auxiliares;
function salarioBase(categoria) {
  switch (categoria) {
    case 1:
      return 1100;
    case 2:
      return 1400;
    case 3:
      return 1900;
    default:
      return 0;
  }
}

function calcularNomina(trabajador) {
  let base = salarioBase(trabajador.categoria);
  let antiguedad = new Date().getFullYear() - trabajador.contratacion;
  let incremento = base * 0.04 * antiguedad;
  return base + incremento;
}

//Funciones Principales

function listarTrabajadores() {
  if (trabajadores.length === 0) {
    alert("No hay trabajadores registrados.");
    return;
  }

  let salida = "=== LISTADO DE TRABAJADORES ===\n\n";
  for (let t of trabajadores) {
    salida += `${t.codigo} - ${t.nombre} - Categoría: ${t.categoria} - Año contratación: ${t.contratacion}\n`;
  }
  alert(salida);
  console.log(salida);
}

function crearTrabajador() {
  let nombre = prompt("Introduce el nombre del trabajador:");
  if (!nombre) {
    alert("❌ El nombre no puede estar vacío.");
    return;
  }

  let categoria = parseInt(prompt("Introduce la categoría (1, 2 o 3):"));
  if (![1, 2, 3].includes(categoria)) {
    alert("❌ Categoría inválida. Debe ser 1, 2 o 3.");
    return;
  }

  let contratacion = parseInt(
    prompt("Introduce el año de contratación (ej: 2022):")
  );
  if (
    isNaN(contratacion) ||
    contratacion > new Date().getFullYear() ||
    contratacion < 1980
  ) {
    alert("❌ Año de contratación inválido.");
    return;
  }

  let codigo = "E" + String(siguienteCodigo).padStart(2, "0");
  siguienteCodigo++;

  trabajadores.push({ codigo, nombre, categoria, contratacion });
  alert(`✅ Trabajador ${nombre} creado con código ${codigo}.`);
}

function borrarTrabajador() {
  let codigo = prompt(
    "Introduce el código del trabajador a eliminar (ej: E02):"
  );
  let index = trabajadores.findIndex((t) => t.codigo === codigo);

  if (index === -1) {
    alert("❌ No se encontró ningún trabajador con ese código.");
    return;
  }

  let confirmar = confirm(
    `¿Seguro que deseas eliminar a ${trabajadores[index].nombre}?`
  );
  if (confirmar) {
    trabajadores.splice(index, 1);
    alert("✅ Trabajador eliminado correctamente.");
  } else {
    alert("❌ Operación cancelada.");
  }
}

function modificarTrabajador() {
  let codigo = prompt(
    "Introduce el código del trabajador a modificar (ej: E01):"
  );
  let trabajador = trabajadores.find((t) => t.codigo === codigo);

  if (!trabajador) {
    alert("❌ Trabajador no encontrado.");
    return;
  }

  // Pedimos nuevos valores con los actuales como predeterminados
  let nuevoNombre = prompt("Nombre:", trabajador.nombre);
  let nuevaCategoria = parseInt(
    prompt("Categoría (1, 2 o 3):", trabajador.categoria)
  );
  let nuevoAnio = parseInt(
    prompt("Año de contratación:", trabajador.contratacion)
  );

  if (![1, 2, 3].includes(nuevaCategoria) || isNaN(nuevoAnio)) {
    alert("❌ Datos inválidos.");
    return;
  }

  trabajador.nombre = nuevoNombre;
  trabajador.categoria = nuevaCategoria;
  trabajador.contratacion = nuevoAnio;

  alert(`✅ Datos del trabajador ${codigo} actualizados.`);
}

function calcularNominas() {
  if (trabajadores.length === 0) {
    alert("No hay trabajadores registrados.");
    return;
  }

  let categorias = { 1: [], 2: [], 3: [] };
  let totalEmpresa = 0;

  // Calcular nóminas
  for (let t of trabajadores) {
    let nomina = calcularNomina(t);
    categorias[t.categoria].push({ ...t, nomina });
    totalEmpresa += nomina;
  }

  // Mostrar resultados
  let salida = "=== LISTADO DE NÓMINAS POR CATEGORÍA ===\n\n";
  for (let cat in categorias) {
    if (categorias[cat].length > 0) {
      let totalCat = categorias[cat].reduce((sum, t) => sum + t.nomina, 0);
      salida += `Categoría ${cat}:\n`;
      for (let t of categorias[cat]) {
        salida += `  ${t.codigo} - ${t.nombre} - Nómina: ${t.nomina.toFixed(
          2
        )}€\n`;
      }
      salida += `  TOTAL categoría ${cat}: ${totalCat.toFixed(2)}€\n\n`;
    }
  }

  salida += `TOTAL GENERAL EMPRESA: ${totalEmpresa.toFixed(2)}€`;

  alert(salida);
  console.log(salida);
}

function menu() {
  let opcion;
  do {
    opcion = prompt(
      "=== MENÚ GESTIÓN DE PERSONAL ===\n" +
        "1 - Listar trabajadores\n" +
        "2 - Crear trabajador\n" +
        "3 - Borrar trabajador\n" +
        "4 - Modificar trabajador\n" +
        "5 - Calcular nóminas\n" +
        "0 - Salir\n\n" +
        "Elige una opción:"
    );

    switch (opcion) {
      case "1":
        listarTrabajadores();
        break;
      case "2":
        crearTrabajador();
        break;
      case "3":
        borrarTrabajador();
        break;
      case "4":
        modificarTrabajador();
        break;
      case "5":
        calcularNominas();
        break;
      case "0":
        alert("👋 Programa finalizado.");
        break;
      default:
        alert("❌ Opción no válida.");
    }
  } while (opcion !== "0");
}

// EJECUCIÓN
menu();
