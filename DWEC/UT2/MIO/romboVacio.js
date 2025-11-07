// Dibuja un rombo hueco (estilo logo Renault).
// n = longitud de la diagonal mayor (mejor impar, si es par se incrementa).
function dibujarRomboHueco(n) {
  // Validaciones y ajustes
  if (typeof n !== "number" || n < 1) {
    throw new Error("n debe ser un número entero positivo");
  }
  n = Math.floor(n);
  if (n % 2 === 0) n = n + 1; // convertir a impar si el usuario pone par

  const medio = Math.floor(n / 2); // índice de la fila central
  const rombo = [];

  for (let fila = 0; fila < n; fila++) {
    // distancia desde la fila central -> determina espacios a la izquierda
    let dist = Math.abs(medio - fila);
    // posición del primer '*' (izquierda) y segundo '*' (derecha)
    let izq = dist;
    let der = n - 1 - dist;

    let linea = "";
    for (let col = 0; col < n; col++) {
      // si estamos en la posición de la izquierda o de la derecha dibujamos '*'
      if (col === izq || col === der) linea += "*";
      else linea += " ";
    }
    rombo[rombo.length] = linea;
  }

  // Imprimir en consola y devolver array
  for (let ln of rombo) console.log(ln);
  return rombo;
}
