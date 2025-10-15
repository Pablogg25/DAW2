// filepath: c:\Users\usuario\Desktop\DAW2\Desarrollo Web en Entorno Cliente\UT1\Ejercicios\Ejercicios_Logica\8.js
function calcularFactorial(n) {
    let resultado = 1;
    let desarrollo = "";
    for (let i = n; i > 0; i--) {
        resultado *= i;
        desarrollo += i;
        if (i > 1) {
            desarrollo += "x";
        }
    }
    desarrollo += "=" + resultado;
    return desarrollo;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("iniciar").addEventListener("click", function () {
        let continuar = true;
        while (continuar) {
            let entrada = prompt("Introduce un número para calcular su factorial:");
            let numero = parseInt(entrada);
            if (!isNaN(numero) && numero >= 0) {
                alert(calcularFactorial(numero));
            } else {
                alert("Introduce un número válido (mayor o igual que 0).");
            }
            continuar = confirm("¿Quieres calcular otro factorial?");
        }
    });
});