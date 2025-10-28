let contador = 0;
let maximo = null;
let minimo = null;
let numero;
let suma = 0;
do {
  numero = Number(prompt("¿Introduce un numero distinto de 0?"));
  if (numero !== 0) {
    suma += numero;
    contador++;
    if (maximo === null || numero > maximo) {
      maximo = numero;
    }
    if (minimo === null || numero < minimo) {
      minimo = numero;
    }
  }
} while (numero !== 0);

let media = contador > 0 ? suma / contador : 0;
alert(
  `RESULTADOS:
Total de números: ${contador}
Suma: ${suma}
Media: ${media}
Máximo: ${maximo}
Mínimo: ${minimo}`
);
