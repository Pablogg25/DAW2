const $taller = (function () {
  let data = [
    {
      id: 1,
      matricula: "1234ABC",
      marca: "Seat",
      modelo: "Ibiza",
      kilometros: 72000,
      precio: 8500,
    },
    {
      id: 2,
      matricula: "5678XYZ",
      marca: "Ford",
      modelo: "Focus",
      kilometros: 98000,
      precio: 9100,
    },
    {
      id: 3,
      matricula: "1111BBB",
      marca: "Seat",
      modelo: "León",
      kilometros: 35000,
      precio: 14500,
    },
  ];
  function listar() {
    for (let i = 0; i < data.length; i++) {
      console.log(
        `${data[i].id} - ${data[i].matricula} - ${data[i].marca} ${data[i].modelo} - ${data[i].kilometros} km - ${data[i].precio}€`
      );
    }
  }

  function buscarMatricula(matricula) {
    if (matricula == null) return "Búsqueda cancelada";
    matricula = String(matricula).trim();
    for (let i = 0; i < data.length; i++) {
      if (data[i].matricula === matricula) {
        console.log(
          `${data[i].id} - ${data[i].matricula} - ${data[i].marca} ${data[i].modelo} - ${data[i].kilometros} km - ${data[i].precio}€`
        );
        return;
      }
    }
    return console.log("Vehiculo no encotrado");
  }

  function masBarato() {
    let masBarato = data[0];
    for (let i = 0; i < data.length; i++) {
      if (data[i].precio < masBarato.precio) {
        masBarato = data[i];
      }
    }
    return console.log(
      console.log(
        `${masBarato.Id} - ${masBarato.matricula} - ${masBarato.marca} ${masBarato.modelo} - ${masBarato.kilometros} km - ${masBarato.precio}€`
      )
    );
  }

  function mediaPrecio() {
    let suma = 0;
    for (let i = 0; i < data.length; i++) {
      suma += data[i].precio;
    }
    let media = suma / data.length;
    return console.log(`La media de precio de los coches es de ${media} €`);
  }

  function añadir(coche) {
    if (!coche || typeof coche !== "object") {
      return "Datos inválidos (se esperaba objeto)";
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].matricula === coche.matricula)
        return "Matrícula ya existe, no se puede añadir";
    }
    let maxId = 0;
    for (let i = 0; i < data.length; i++)
      if (data[i].id > maxId) maxId = data[i].id;
    if (!coche.id) coche.id = maxId + 1;

    data[data.length] = coche;
    return "Vehículo añadido";
  }
  // ELIMINAR POR ID (id numérico)
  function eliminar(id) {
    // convertir id a número seguro
    let nid = Number(id);
    if (Number.isNaN(nid)) return "Id no válido";

    let encontrado = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === nid) {
        for (let j = i; j < data.length - 1; j++) data[j] = data[j + 1];
        data.length = data.length - 1;
        encontrado = true;
        break;
      }
    }
    return encontrado ? "Vehículo eliminado" : "ID no encontrado";
  }

  //DEVOLVEMOS LAS FUNCIOENS
  return {
    listar,
    buscarMatricula,
    masBarato,
    mediaPrecio,
    añadir,
    eliminar,
  };
})();

function menu() {
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
        console.log($taller.listar());
        break;

      case "2":
        let matricula = prompt(
          "Introduzca la matricula del vehiculo que desee buscar"
        );
        if (matricula === null) {
          alert("La matricula introducida no es valida");
          break;
        }
        $taller.buscarMatricula(matricula);
        break;

      case "3":
        $taller.masBarato();
        break;
      case "4":
        $taller.mediaPrecio();
        break;
      case "5":
        let nuevo = {
          id: parseInt(prompt("ID:")),
          matricula: prompt("Matrícula:"),
          marca: prompt("Marca:"),
          modelo: prompt("Modelo:"),
          kilometros: parseInt(prompt("KMs:")),
          precio: parseInt(prompt("Precio:")),
        };
        console.log($taller.añadir(nuevo));
        break;
      case "6": {
        let id = prompt("Introduce el id del vehiculo que quieres eliminar");
        if (id === null) {
          console.log("Operación cancelada");
          break;
        }
        console.log($taller.eliminar(id));
        break;
      }
      case "0":
        alert("Saliendo...");
        break;

      default:
        alert("Opción no válida");
        break;
    }
  } while (op !== "0" && op !== null);
  setTimeout(0);
}
menu();
