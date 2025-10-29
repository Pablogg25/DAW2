// DATOS INICIALES
let alumnos = [
  {
    nombre: "Lucía",
    asignaturas: [
      { modulo: "DWEC", nota: 8 },
      { modulo: "DIW", nota: 7 },
      { modulo: "DWES", nota: 6 },
      { modulo: "DAW", nota: 9 },
    ],
  },
  {
    nombre: "Carlos",
    asignaturas: [
      { modulo: "DWEC", nota: 4 },
      { modulo: "DIW", nota: 5 },
      { modulo: "DWES", nota: 3 },
      { modulo: "DAW", nota: 6 },
    ],
  },
  {
    nombre: "María",
    asignaturas: [
      { modulo: "DWEC", nota: 5 },
      { modulo: "DIW", nota: 9 },
      { modulo: "DWES", nota: 8 },
      { modulo: "DAW", nota: 7 },
    ],
  },
];

// Funcion que recibe array de alumnos y añade propiedades
function evaluarAlumnos(listaAlumnos) {
  for (let alumno of listaAlumnos) {
    let suma = 0;
    let todosAprobados = true;
    for (let asignatura of alumno.asignaturas) {
      suma += asignatura.nota;
      if (asignatura < 5) {
        todosAprobados = false;
      }
    }
    let media = suma / alumno.asignaturas.length;
    alumno.media = media.toFixed(2);
    alumno.promociona = todosAprobados;
  }
  return listaAlumnos;
}

// Listar los alumnos promocionados
function listarPromocionados(listaAlumnos) {
  console.log("\nALUMNOS QUE PROMOCIONAN");
  for (let i = 0; i < listaAlumnos.length; i++) {
    let alumno = listaAlumnos[i];
    if (alumno.promociona) {
      console.log(`${i} - ${alumno.nombre} - Media: ${alumno.media}`);
    }
  }
}

//Listar No promocionados
function listarNoPromocionados(listaAlumnos) {
  console.log("\nALUMNOS QUE NO PROMOCIONAN");
  for (let i = 0; i < listaAlumnos.length; i++) {
    let alumno = listaAlumnos[i];
    if (!alumno.promociona) {
      let pendientes = [];
      for (let asignatura of alumno.asignatura) {
        if (asignatura.nota < 5) {
          pendientes.push(asignatura.modulo);
        }
      }
      console.log(
        `${i} - ${alumno.nombre} - Pendientes: [${pendientes.join(", ")}]`
      );
    }
  }
}

//Codigo auxiliar
alumnos = evaluarAlumnos(alumnos);
listarPromocionados(alumnos);
listarNoPromocionados(alumnos);
