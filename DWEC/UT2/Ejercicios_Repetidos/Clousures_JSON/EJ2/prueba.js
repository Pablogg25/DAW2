"use strict";
const $yedra = (function () {
  let alumnos = [
    { nombre: "Ana", nota: 8.5, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Luis", nota: 4.2, modulo: "DWES", convocatorias: 2 },
    { nombre: "Marta", nota: 6.9, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Carlos", nota: 3.8, modulo: "DWES", convocatorias: 3 },
    { nombre: "Sofía", nota: 9.1, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Pablo", nota: 2.5, modulo: "DWEC", convocatorias: 2 },
  ];

  function listarSuspensos() {
    let lista = [];
    for (let i = 0; i < alumnos.length; i++) {
      if (alumnos[i].nota < 5) {
        let a = alumnos[i];
        lista[lista.length] = {
          nombre: a.nombre,
          nota: a.nota,
          modulo: a.modulo,
          convocatorias: a.convocatorias,
        };
      }
    }
    // Ordenar alfabéticamente los alumnos
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

  return { listarSuspensos };
})();

console.log($yedra.listarSuspensos());
