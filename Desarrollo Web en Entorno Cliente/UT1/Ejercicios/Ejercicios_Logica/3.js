function dibujarRectangulo(lado) {
    if (lado < 2) return ["El lado debe ser mayor o igual a 2"];
    const rectangulo = [];
    const filaLlena = "*".repeat(lado);
    const filaHueca = "*" + " ".repeat(lado - 2) + "*";
    rectangulo.push(filaLlena);
    for (let i = 0; i < lado - 2; i++) {
        rectangulo.push(filaHueca);
    }
    rectangulo.push(filaLlena);
    return rectangulo;
}

// Código auxiliar para probar la función
const lado = parseInt(prompt("Introduce el tamaño del lado del rectángulo:"));
const resultado = dibujarRectangulo(lado);
resultado.forEach(linea => console.log(linea));