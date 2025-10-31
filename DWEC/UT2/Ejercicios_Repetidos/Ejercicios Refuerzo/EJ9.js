function marcoFrases(cadena) {
  let palabras = [];
  let palabraActual = "";
  // Separar palabras manualmente
  for (let i = 0; i < cadena.length; i++) {
    if (cadena[i] !== " ") {
      palabraActual += cadena[i];
    } else {
      if (palabraActual !== "") {
        palabras[palabras.length] = palabraActual;
      }
      palabraActual = "";
    }
  }
  // Buscar longitud máxima
  let maxLen = 0;
  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > maxLen) {
      maxLen = palabras[i].length;
    }
  }
  // Línea superior
  let borde = "";
  for (let i = 0; i < maxLen + 4; i++) borde += "*";
  console.log(borde);
  // Mostrar cada palabra con espacios
  for (let i = 0; i < palabras.length; i++) {
    let linea = "* " + palabras[i];

    // Rellenar espacios
    for (let j = palabras[i].length; j < maxLen; j++) {
      linea += " ";
    }
    linea += " *";

    console.log(linea);
  }

  // Línea inferior
  console.log(borde);
}

// PRUEBA
marcoFrases("¿Qué te parece el reto?");
