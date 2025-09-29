"use strict";

function generarPregunta() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operadores = ["+", "-", "*", "/"];
    let op = operadores[Math.floor(Math.random() * operadores.length)];
    let pregunta = `${num1} ${op} ${num2}`;
    let resultado;

    switch (op) {
        case "+":
            resultado = num1 + num2;
            break;
        case "-":
            resultado = num1 - num2;
            break;
        case "*":
            resultado = num1 * num2;
            break;
        case "/":
            resultado = parseFloat((num1 / num2).toFixed(2));
            break;
    }
    return { pregunta, resultado };
}

function juegoMates() {
    let historial = [];
    let seguir = true;
    let totalAcertadas = 0;
    let totalFalladas = 0;
    let preguntaNum = 1;

    while (seguir) {
        for (let i = 0; i < 4; i++) {
            let { pregunta, resultado } = generarPregunta();
            let respuesta = prompt(`Pregunta ${preguntaNum}: ¿Cuánto es ${pregunta}? (Si es división, pon 2 decimales)`);
            let acierto = false;

            if (pregunta.includes("/")) {
                acierto = parseFloat(respuesta) === resultado;
            } else {
                acierto = parseInt(respuesta) === resultado;
            }

            if (acierto) {
                alert("¡Correcto!");
                totalAcertadas++;
            } else {
                alert(`Incorrecto. La respuesta era ${resultado}`);
                totalFalladas++;
            }

            historial.push({
                numero: preguntaNum,
                pregunta: pregunta,
                respuesta: respuesta,
                acierto: acierto ? "✔️" : "❌"
            });

            preguntaNum++;
        }
        seguir = confirm("¿Quieres seguir jugando?");
    }

    // Mostrar resumen
    let resumen = "Resumen del juego:\n";
    for (let i = 0; i < historial.length; i++) {
        resumen += `Pregunta ${historial[i].numero}: ${historial[i].pregunta} = ${historial[i].respuesta} (${historial[i].acierto})\n`;
    }
    resumen += `\nTotal acertadas: ${totalAcertadas}\nTotal falladas: ${totalFalladas}`;
    alert(resumen);
}

// Código auxiliar para probar la aplicación
document.addEventListener("DOMContentLoaded", function () {
    juegoMates();
});