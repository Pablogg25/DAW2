function dibujarCuadradoHueco(n) {
  let figura = [];

  for (let fila = 1; fila <= n; fila++) {
    let linea = "";
    for (let col = 1; col <= n; col++) {
      if (fila === 1 || fila === n || col === 1 || col === n) {
        linea += "*";
      } else {
        linea += " ";
      }
    }
    figura.push(linea);
  }

  return figura;
}

// Triángulo
function dibujarTriangulo(n) {
  let figura = [];

  for (let i = 1; i <= n; i++) {
    let linea = "";
    for (let j = 1; j <= i; j++) {
      linea += "*";
    }
    figura.push(linea);
  }

  return figura;
}

// Rombo
function dibujarRombo(n) {
  let figura = [];

  // Parte superior
  for (let i = 1; i <= n; i += 2) {
    let linea = "";

    // Espacios a la izquierda
    for (let e = 1; e <= (n - i) / 2; e++) {
      linea += " ";
    }
    // Asteriscos
    for (let a = 1; a <= i; a++) {
      linea += "*";
    }

    figura.push(linea);
  }

  // Parte inferior
  for (let i = n - 2; i >= 1; i -= 2) {
    let linea = "";

    // Espacios
    for (let e = 1; e <= (n - i) / 2; e++) {
      linea += " ";
    }
    // Asteriscos
    for (let a = 1; a <= i; a++) {
      linea += "*";
    }

    figura.push(linea);
  }

  return figura;
}

function dibujarPoligono(funcionPoligono, tamaño) {
  const figura = funcionPoligono(tamaño);
  alert(figura.join("\n"));
}

// Menu

let opcion;

do {
  opcion = parseInt(
    prompt(
      "MENÚ DE FIGURAS:\n" +
        "1 - Cuadrado hueco\n" +
        "2 - Triángulo\n" +
        "3 - Rombo\n" +
        "0 - Terminar\n\n" +
        "Elige una opción:"
    )
  );
  if (opcion === 0) {
    alert("Programa termiando");
    break;
  }

  let tamaño = parseInt(prompt("Introduce el tamaño del poligono: "));
  switch (opcion) {
    case 1:
      dibujarPoligono(dibujarCuadradoHueco, tamaño);
      break;
    case 2:
      dibujarPoligono(dibujarTriangulo, tamaño);
      break;
    case 3:
      if (tamaño % 2 === 0) {
        alert("El tamaño del rombo debe ser un número impar.");
      } else {
        dibujarFdibujarPoligonoigura(dibujarRombo, tamaño);
      }
      break;
    default:
      alert("Opción no válida. Intenta de nuevo.");
  }
} while (opcion != 0);
