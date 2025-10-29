function cuentaLetras(frase) {
  let contador = {};
  for (let i = 0; i < frase.length; i++) {
    let caracter = frase[i];
    if (contador[caracter]) {
      contador[caracter]++;
    } else {
      contador[caracter] = 1;
    }
  }
  return contador;
}

let texto = prompt("Introduce una cadena de texto:");

let resultado = cuentaLetras(texto);

console.log("Resultado del conteo:", resultado);

let salida = "Conteo de caracteres:\n\n";

for (let caracter in resultado) {
  salida += `'${caracter}' → ${resultado[caracter]} veces\n`;
}

alert(salida);
