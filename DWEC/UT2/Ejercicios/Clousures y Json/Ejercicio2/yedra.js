const $yedra = (function () {
  let alumnos = [
    { nombre: "Ana", nota: 8.5, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Luis", nota: 4.2, modulo: "DWES", convocatorias: 2 },
    { nombre: "Marta", nota: 6.9, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Carlos", nota: 3.8, modulo: "DWES", convocatorias: 3 },
    { nombre: "Sofía", nota: 9.1, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Pablo", nota: 2.5, modulo: "DWEC", convocatorias: 2 },
  ];
  //Lista de alumnos suspensos
  function suspensos() {
    let lista = [];
    for (let i = 0; i < alumnos.length; i++) {
      let a = alumnos[i];
      if (a.nota < 5) {
        lista[lista.length] = {
          nombre: a.nombre,
          nota: a.nota,
          modulo: a.modulo,
        };
      }
    }
    for (let i = 0; i < lista.length - 1; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        if (lista[i].nombre > lista[j].nombre) {
          let temp = lista[i];
          lista[i] = lista[j];
          lista[j] = temp;
        }
      }
    }
    return lista;
  }
  //Estadisticas por modulo
  function estadisticas() {
    let modulos = {};
    for (let i = 0; i < alumnos.length; i++) {
      let a = alumnos[i];

      if (!modulos[a.modulo]) {
        modulos[a.modulo] = { totalNota: 0, totalConv: 0, cantidad: 0 };
      }

      modulos[a.modulo].totalNota += a.nota;
      modulos[a.modulo].totalConv += a.convocatorias;
      modulos[a.modulo].cantidad++;
    }
    let resultado = [];

    for (let modulo in modulos) {
      let datos = modulos[modulo];
      resultado[resultado.length] = {
        modulo: modulo,
        mediaNota: Number((datos.totalNota / datos.cantidad).toFixed(2)),
        mediaConv: Number((datos.totalConv / datos.cantidad).toFixed(2)),
      };
    }

    // Ordenar por mediaConv DESC (manual)
    for (let i = 0; i < resultado.length - 1; i++) {
      for (let j = i + 1; j < resultado.length; j++) {
        if (resultado[i].mediaConv < resultado[j].mediaConv) {
          let temp = resultado[i];
          resultado[i] = resultado[j];
          resultado[j] = temp;
        }
      }
    }

    return resultado;
  }
  //Devolver Alumnos
  function exportarJSON() {
    return JSON.stringify(alumnos);
  }
  //Importar JSON
  // ---- 4. IMPORTAR JSON ----
  function importarJSON(texto) {
    try {
      let datos = JSON.parse(texto);
      if (!Array.isArray(datos)) {
        alert("El JSON debe ser un array");
        return;
      }
      alumnos = datos;
      alert("Datos cargados correctamente");
    } catch (e) {
      alert("JSON inválido");
    }
  }
  return {
    suspensos,
    estadisticas,
    exportarJSON,
    importarJSON,
  };
})();
