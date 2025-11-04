const $yedra = (function () {
  let alumnos = [
    { nombre: "Ana", nota: 8.5, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Luis", nota: 4.2, modulo: "DWES", convocatorias: 2 },
    { nombre: "Marta", nota: 6.9, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Carlos", nota: 3.8, modulo: "DWES", convocatorias: 3 },
    { nombre: "Sofía", nota: 9.1, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Pablo", nota: 2.5, modulo: "DWEC", convocatorias: 2 },
  ];

  // ---- 1) Lista de suspensos ----
  function listarSuspensos() {
    let lista = [];
    console.log("Filtrando suspensos...");
    for (let i = 0; i < alumnos.length; i++) {
      if (alumnos[i].nota < 5) {
        let a = alumnos[i];
        lista.push({
          nombre: a.nombre,
          nota: a.nota,
          modulo: a.modulo,
          convocatorias: a.convocatorias,
        });
      }
    }

    console.log("Lista de suspensos antes de ordenar:", lista);

    // Ordenar por nombre
    for (let i = 0; i < lista.length - 1; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        if (lista[i].nombre > lista[j].nombre) {
          let temp = lista[i];
          lista[i] = lista[j];
          lista[j] = temp;
        }
      }
    }

    console.log("Lista de suspensos ordenada:", lista);
    return lista;
  }

  // ---- 2) Estadísticas ----
  function estadisticas() {
    let modulos = {};
    console.log("Calculando estadísticas...");

    for (let i = 0; i < alumnos.length; i++) {
      let a = alumnos[i];

      if (!modulos[a.modulo]) {
        modulos[a.modulo] = { totalNota: 0, totalConv: 0, cantidad: 0 };
      }

      modulos[a.modulo].totalNota += a.nota;
      modulos[a.modulo].totalConv += a.convocatorias;
      modulos[a.modulo].cantidad++;
    }

    console.log("Datos agrupados por módulo:", modulos);

    let resultado = [];

    for (let modulo in modulos) {
      let d = modulos[modulo];
      resultado.push({
        modulo: modulo,
        notaMedia: Number((d.totalNota / d.cantidad).toFixed(2)),
        convMedia: Number((d.totalConv / d.cantidad).toFixed(2)),
      });
    }

    console.log("Estadísticas sin ordenar:", resultado);

    // Ordenar por convocatorias DESC
    for (let i = 0; i < resultado.length - 1; i++) {
      for (let j = i + 1; j < resultado.length; j++) {
        if (resultado[i].convMedia < resultado[j].convMedia) {
          let tmp = resultado[i];
          resultado[i] = resultado[j];
          resultado[j] = tmp;
        }
      }
    }

    console.log("Estadísticas ordenadas por convocatorias:", resultado);
    return resultado;
  }

  // ---- 3) Exportar JSON ----
  function devolver() {
    console.log("Devolviendo datos en formato JSON...");
    return JSON.stringify(alumnos);
  }

  // ---- 4) Importar JSON ----
  function cargar(texto) {
    try {
      let datos = JSON.parse(texto);
      if (!Array.isArray(datos)) {
        alert("El JSON debe ser un array");
        return;
      }
      alumnos = datos;
      alert("Datos cargados correctamente");
    } catch (e) {
      alert("JSON no válido");
    }
  }

  return {
    listarSuspensos,
    estadisticas,
    devolver,
    cargar,
  };
})();
console.log($yedra.listarSuspensos());
console.log($yedra.estadisticas());
console.log($yedra.devolver());
console.log(
  $yedra.cargar(
    '[{"nombre":"Mario","nota":10,"modulo":"DWEC","convocatorias":1}]'
  )
);
