function equilibrarExpresion(expresion) {
  let pila = [];

  // Listas de apertura y cierre
  let apertura = "{([";
  let cierre = "})]";
  for (let i = 0; i < expresion.length; i++) {
    let letra = expresion[i];
    for (let j = 0; j < apertura.length; j++) {
      if (letra === apertura[j]) {
        pila[pila.length] = letra;
      }
    }
    for (let j = 0; j < cierre.length; j++) {
      if (letra == cierre[j]) {
        if (pila.length === 0) return false;

        let ultimo = pila[pila.length - 1];
        pila.length = pila.length - 1;
        if (apertura[j] !== ultimo) return false;
      }
    }
  }
  return pila.length === 0;
}

console.log(equilibrarExpresion("{ [ a * ( c + d ) ] - 5 }")); // true
console.log(equilibrarExpresion("{ a * ( c + d ) ] - 5 }")); // false
console.log(equilibrarExpresion("( [ { } ] )")); // true
console.log(equilibrarExpresion("( [ { ] } )")); // false
