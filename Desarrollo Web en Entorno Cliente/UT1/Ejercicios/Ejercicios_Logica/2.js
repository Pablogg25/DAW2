"use strict";

// Solicita números al usuario hasta que introduce un 0 y muestra máximo, mínimo, suma, media y total
let numeros = [];
let num;
do {
    num = parseFloat(prompt("Introduce un número (0 para terminar):"));
    if (num !== 0 && !isNaN(num)) {
        numeros.push(num);
    }
} while (num !== 0);

if (numeros.length > 0) {
    let maximo = Math.max(...numeros);
    let minimo = Math.min(...numeros);
    let suma = numeros.reduce((a, b) => a + b, 0);
    let media = suma / numeros.length;
    let total = numeros.length;
    alert(`Máximo: ${maximo}\nMínimo: ${minimo}\nSuma: ${suma}\nMedia: ${media}\nTotal de números: ${total}`);
} else {
    alert("No se introdujeron números.");
}
