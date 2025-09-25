"use strict";
// Función que recibe un número y devuelve un array con las líneas de un triángulo de altura n
function dibujarTriangulo(n) {
    let resultado = [];
    for (let i = 1; i <= n; i++) {
        resultado.push("*".repeat(i));
    }
    return resultado;
}

// Código auxiliar para probar la función
document.addEventListener("DOMContentLoaded", function() {
    let altura = parseInt(prompt("Introduce la altura del triángulo:"));
    if (!isNaN(altura) && altura > 0) {
        let triangulo = dibujarTriangulo(altura);
        alert(triangulo.join("\n"));
        // También puedes mostrarlo en consola:
        console.log(triangulo.join("\n"));
    } else {
        alert("Por favor, introduce un número válido mayor que 0.");
    }
});