function dibujarTriangulo(a) {
  let triangulo = [];
  for (let i = 0; i < a; i++) {
    let linea = "";
    for (let j = 0; j <= i; j++) {
      linea += "*";
    }
    triangulo[triangulo.length] = linea;
  }
  return triangulo;
}
let altura = prompt("¿De que altura deseas tu triangulo?");
let figura = dibujarTriangulo(altura);
for (let linea of figura) {
  console.log(linea);
}
alert(figura.join("\n"));
