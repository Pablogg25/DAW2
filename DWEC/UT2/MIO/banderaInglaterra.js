function dibujarCuadradoConDiagonalesYMas(n) {
  if (typeof n !== "number" || n < 3) {
    throw new Error("n debe ser un número entero >= 3");
  }
  n = Math.floor(n); // por si pasan decimales
  const medio = Math.floor(n / 2);
  const resultado = [];

  for (let i = 0; i < n; i++) {
    let linea = "";
    for (let j = 0; j < n; j++) {
      // condiciones para dibujar '*'
      const esBorde = i === 0 || i === n - 1 || j === 0 || j === n - 1;
      const diagPrincipal = i === j; // '\'
      const diagSecundaria = i + j === n - 1; // '/'
      const lineaHorizontalCentro = i === medio; // parte del '+'
      const lineaVerticalCentro = j === medio; // parte del '+'

      if (
        esBorde ||
        diagPrincipal ||
        diagSecundaria ||
        lineaHorizontalCentro ||
        lineaVerticalCentro
      ) {
        linea += "*";
      } else {
        linea += " ";
      }
    }
    resultado.push(linea);
  }

  // imprimir en consola
  for (let l of resultado) console.log(l);
  return resultado;
}

let n = Number(prompt("Introduzca el tamaño de la bandera"));
dibujarCuadradoConDiagonalesYMas(n);
