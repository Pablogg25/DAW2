// ======== FUNCIÓN AUXILIAR: comprobar si un número es primo ========
function esPrimo(num) {
  if (num < 2) return false; // 0 y 1 no son primos
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false; // si tiene divisores, no es primo
  }
  return true;
}

// ======== FUNCIÓN PRINCIPAL ========
function analizarRango(inicio, fin) {
  // Validaciones básicas
  if (isNaN(inicio) || isNaN(fin)) {
    alert("Debes introducir números válidos.");
    return;
  }

  if (inicio > fin) {
    // intercambiar si están al revés
    let temp = inicio;
    inicio = fin;
    fin = temp;
  }

  let resultado = "";

  // Recorremos el rango
  for (let num = inicio; num <= fin; num++) {
    let mensaje = "";

    // Comprobaciones
    if (num % 3 === 0) mensaje += "múltiplo de 3, ";
    if (num % 5 === 0) mensaje += "múltiplo de 5, ";
    if (esPrimo(num)) mensaje += "primo, ";

    // Si cumple alguna condición, mostrarlo
    if (mensaje !== "") {
      // eliminamos la última coma y espacio
      mensaje = mensaje.slice(0, -2);
      resultado += `${num}: ${mensaje}\n`;
    }
  }

  if (resultado === "") {
    resultado = "Ningún número en el rango cumple las condiciones.";
  }

  alert(resultado);
  console.log(resultado);
}

// ======== CÓDIGO AUXILIAR PARA PROBAR ========
let inicio = parseInt(prompt("Introduce el inicio del rango:"));
let fin = parseInt(prompt("Introduce el final del rango:"));

analizarRango(inicio, fin);
