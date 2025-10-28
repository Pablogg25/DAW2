function dibujarRectangulo(n) {
  let rectangulo = [];
  for (let i = 0; i < n; i++) {
    let linea = "";
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === n - 1 || j === 0 || j === n - 1) {
        linea += "*";
      } else {
        linea += " ";
      }
    }
    rectangulo.push(linea);
  }
  return rectangulo;
}
let lado = parseInt(prompt("Introducza el alto del rectangulo"));

let figura = dibujarRectangulo(lado);

console.log("Rectángulo hueco:");
for (let linea of figura) {
  console.log(linea);
}

alert(figura.join("\n"));
