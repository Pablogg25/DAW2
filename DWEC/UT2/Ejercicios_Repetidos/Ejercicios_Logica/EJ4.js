function dibujarTriangulo(n) {
  let triangulo = [];

  // Bucle para crear cada línea
  for (let i = 1; i <= n; i++) {
    let linea = "";
    // En cada fila, añadimos tantos * como el número de fila
    for (let j = 1; j <= i; j++) {
      linea += "*";
    }
    triangulo.push(linea); // añadimos la línea al array
  }

  return triangulo;
}
let altura = parseInt(prompt("Introduce la altura del triángulo:"));
let figura = dibujarTriangulo(altura);

console.log("Triángulo:");
for (let linea of figura) {
  console.log(linea);
}

alert(figura.join("\n"));
