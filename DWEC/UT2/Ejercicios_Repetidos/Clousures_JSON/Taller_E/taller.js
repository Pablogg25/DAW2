"use strict";

const $taller = (function () {
  let data = [
    {
      vehiculoId: 1,
      matricula: "1234ABC",
      marca: "Seat",
      modelo: "Ibiza",
      kilometros: 72000,
      precio: 8500,
    },
    {
      vehiculoId: 2,
      matricula: "5678XYZ",
      marca: "Ford",
      modelo: "Focus",
      kilometros: 98000,
      precio: 9100,
    },
    {
      vehiculoId: 3,
      matricula: "1111BBB",
      marca: "Seat",
      modelo: "León",
      kilometros: 35000,
      precio: 14500,
    },
    {
      vehiculoId: 4,
      matricula: "2222CCC",
      marca: "Toyota",
      modelo: "Yaris",
      kilometros: 41000,
      precio: 12800,
    },
    {
      vehiculoId: 5,
      matricula: "3333DDD",
      marca: "Ford",
      modelo: "Fiesta",
      kilometros: 64000,
      precio: 7800,
    },
    {
      vehiculoId: 6,
      matricula: "4444EEE",
      marca: "Peugeot",
      modelo: "308",
      kilometros: 55000,
      precio: 10200,
    },
    {
      vehiculoId: 7,
      matricula: "5555FFF",
      marca: "Toyota",
      modelo: "Corolla",
      kilometros: 83000,
      precio: 11700,
    },
    {
      vehiculoId: 8,
      matricula: "6666GGG",
      marca: "Seat",
      modelo: "Ateca",
      kilometros: 29000,
      precio: 18900,
    },
    {
      vehiculoId: 9,
      matricula: "7777HHH",
      marca: "Ford",
      modelo: "Puma",
      kilometros: 46000,
      precio: 13200,
    },
    {
      vehiculoId: 10,
      matricula: "8888JJJ",
      marca: "Peugeot",
      modelo: "208",
      kilometros: 87000,
      precio: 9400,
    },
  ];

  // LISTAR
  function listar() {
    for (let i = 0; i < data.length; i++) {
      console.log(
        `${data[i].vehiculoId} - ${data[i].matricula} - ${data[i].marca} ${data[i].modelo} - ${data[i].kilometros} km - ${data[i].precio}€`
      );
    }
  }

  // BUSCAR
  function buscar(matricula) {
    if (matricula == null) return "Búsqueda cancelada";
    matricula = String(matricula).trim();
    for (let i = 0; i < data.length; i++) {
      if (data[i].matricula === matricula) {
        return `${data[i].vehiculoId} - ${data[i].matricula} - ${data[i].marca} ${data[i].modelo} - ${data[i].kilometros} km - ${data[i].precio}€`;
      }
    }
    return "Vehiculo no encontrado";
  }

  // FILTRAR MARCA
  function filtrarMarca(marca) {
    if (marca == null) return "Búsqueda cancelada";
    marca = String(marca).trim().toLowerCase();
    let resultado = [];
    for (let i = 0; i < data.length; i++) {
      if (String(data[i].marca).toLowerCase() === marca) {
        resultado[resultado.length] = data[i];
      }
    }
    if (resultado.length === 0) return `No hay vehículos de la marca ${marca}`;
    let salida = "";
    for (let i = 0; i < resultado.length; i++) {
      let v = resultado[i];
      salida += `${v.vehiculoId} - ${v.matricula} - ${v.marca} ${v.modelo} - ${v.kilometros} km - ${v.precio}€\n`;
    }
    salida += `Total: ${resultado.length}`;
    return salida;
  }

  // MAS BARATO
  function masBarato() {
    if (data.length === 0) return "No hay vehículos";
    let min = data[0];
    for (let i = 1; i < data.length; i++) {
      if (data[i].precio < min.precio) min = data[i];
    }
    return `${min.vehiculoId} - ${min.matricula} - ${min.marca} ${min.modelo} - ${min.kilometros} km - ${min.precio}€`;
  }

  // MEDIA PRECIO
  function mediaprecio() {
    if (data.length === 0) return "No hay vehículos";
    let suma = 0;
    for (let i = 0; i < data.length; i++) suma += Number(data[i].precio);
    let media = suma / data.length;
    return "La media de precio es de " + media.toFixed(2) + " €";
  }

  // ORDENAR KMS (de mayor a menor)
  function ordenarKms() {
    // copia manual para no mutar data
    let lista = [];
    for (let i = 0; i < data.length; i++) lista[lista.length] = data[i];

    for (let i = 0; i < lista.length - 1; i++) {
      for (let j = 0; j < lista.length - 1 - i; j++) {
        if (lista[j].kilometros < lista[j + 1].kilometros) {
          let temp = lista[j];
          lista[j] = lista[j + 1];
          lista[j + 1] = temp;
        }
      }
    }

    for (let i = 0; i < lista.length; i++) {
      console.log(
        `${lista[i].vehiculoId} - ${lista[i].matricula} - ${lista[i].kilometros} km - ${lista[i].precio}€`
      );
    }
    return "Listado ordenado por km (ver consola)";
  }

  // EXPORTAR
  function exportar() {
    return JSON.stringify(data);
  }

  // IMPORTAR
  function importar(cadena) {
    if (cadena == null) {
      alert("Importación cancelada");
      return;
    }
    try {
      let array = JSON.parse(cadena);
      if (!Array.isArray(array)) {
        alert("El JSON debe ser un array");
        return;
      }
      // validar estructura mínima (opcional)
      data = array;
      alert("Datos importados correctamente");
    } catch (e) {
      alert("Error al importar el JSON");
    }
  }

  // FILTRAR PRECIO MAX
  function filtrarPrecioMax(precio) {
    if (precio == null) return "Operación cancelada";
    // convertir a número
    let p = Number(precio);
    if (Number.isNaN(p) || p < 0) return "Precio no válido";
    let lista = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].precio <= p) lista[lista.length] = data[i];
    }
    if (lista.length === 0) return `No hay vehículos con precio <= ${p} €`;
    let salida = "";
    for (let i = 0; i < lista.length; i++) {
      salida += `${lista[i].vehiculoId} - ${lista[i].matricula} - ${lista[i].kilometros} km - ${lista[i].precio}€\n`;
    }
    return salida + `\nLista de coches con precio menor o igual a ${p} €`;
  }

  // ELIMINAR POR ID (id numérico)
  function eliminar(id) {
    // convertir id a número seguro
    let nid = Number(id);
    if (Number.isNaN(nid)) return "Id no válido";

    let encontrado = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].vehiculoId === nid) {
        for (let j = i; j < data.length - 1; j++) data[j] = data[j + 1];
        data.length = data.length - 1;
        encontrado = true;
        break;
      }
    }
    return encontrado ? "Vehículo eliminado" : "ID no encontrado";
  }

  // AÑADIR VEHÍCULO (pedimos campos, validación matrícula única)
  function añadir(nuevo) {
    // si se pasa un objeto ya válido, usalo; si no, devolver error
    if (!nuevo || typeof nuevo !== "object")
      return "Datos inválidos (se esperaba objeto)";

    // validar matrícula única
    for (let i = 0; i < data.length; i++) {
      if (data[i].matricula === nuevo.matricula)
        return "Matrícula ya existe, no se puede añadir";
    }

    // si no trae id asignar uno nuevo (max + 1)
    let maxId = 0;
    for (let i = 0; i < data.length; i++)
      if (data[i].vehiculoId > maxId) maxId = data[i].vehiculoId;
    if (!nuevo.vehiculoId) nuevo.vehiculoId = maxId + 1;

    data[data.length] = nuevo;
    return "Vehículo añadido";
  }

  return {
    listar,
    buscar,
    filtrarMarca,
    masBarato,
    mediaprecio,
    ordenarKms,
    exportar,
    importar,
    filtrarPrecioMax,
    eliminar,
    añadir,
  };
})();

// MENU con do...while (manejo adecuado de prompts y conversiones)
function menu() {
  let op;
  do {
    op = prompt(
      "MENU TALLER\n\n1. Listar\n2. Buscar matrícula\n3. Filtrar por marca\n4. Más barato\n5. Media precio\n6. Ordenar por km\n7. Exportar JSON\n8. Importar JSON\n9. Filtrar precio maximo\n10. Eliminar por id\n11. Añadir\n0. Salir"
    );

    if (op === null) {
      alert("Menú cancelado. Saliendo...");
      return;
    }
    op = op.trim();

    switch (op) {
      case "1":
        $taller.listar();
        break;

      case "2": {
        let matricula = prompt("Introduzca la matricula del vehiculo");
        if (matricula === null) {
          console.log("Búsqueda cancelada");
          break;
        }
        console.log($taller.buscar(matricula));
        break;
      }

      case "3": {
        let marca = prompt("Introduce la marca (ej: Seat, Ford)");
        if (marca === null) {
          console.log("Búsqueda cancelada");
          break;
        }
        console.log($taller.filtrarMarca(marca));
        break;
      }

      case "4":
        console.log($taller.masBarato());
        break;

      case "5":
        console.log($taller.mediaprecio());
        break;

      case "6":
        console.log($taller.ordenarKms());
        break;

      case "7":
        alert($taller.exportar());
        break;

      case "8": {
        let cadena = prompt("Pega aquí el JSON a importar (o Cancelar)");
        $taller.importar(cadena);
        break;
      }

      case "9": {
        let precio = prompt("Introduce el precio maximo deseado (número)");
        if (precio === null) {
          console.log("Operación cancelada");
          break;
        }
        console.log($taller.filtrarPrecioMax(precio));
        break;
      }

      case "10": {
        let id = prompt("Introduce el id del vehiculo que quieres eliminar");
        if (id === null) {
          console.log("Operación cancelada");
          break;
        }
        console.log($taller.eliminar(id));
        break;
      }

      case "11": {
        // pedir datos uno a uno para evitar JSONs malformadas
        let matricula = prompt("Matricula (ej: 9999ZZZ)");
        if (matricula === null) {
          console.log("Añadir cancelado");
          break;
        }
        let marca = prompt("Marca (ej: Tesla)");
        if (marca === null) {
          console.log("Añadir cancelado");
          break;
        }
        let modelo = prompt("Modelo (ej: Model 3)");
        if (modelo === null) {
          console.log("Añadir cancelado");
          break;
        }
        let kms = prompt("Kilometros (ej: 20000)");
        if (kms === null) {
          console.log("Añadir cancelado");
          break;
        }
        let precio = prompt("Precio (ej: 35000)");
        if (precio === null) {
          console.log("Añadir cancelado");
          break;
        }

        // construir objeto y validar numéricos
        let nuevo = {
          matricula: String(matricula).trim(),
          marca: String(marca).trim(),
          modelo: String(modelo).trim(),
          kilometros: Number(kms),
          precio: Number(precio),
        };
        if (Number.isNaN(nuevo.kilometros) || Number.isNaN(nuevo.precio)) {
          console.log("Km o precio no válidos. Operación cancelada.");
          break;
        }
        console.log($taller.añadir(nuevo));
        break;
      }

      case "0":
        alert("Saliendo...");
        break;

      default:
        alert("Opción no válida");
        break;
    }
  } while (op !== "0");
  setTimeout(0);
}

// arrancar el menú
menu();
