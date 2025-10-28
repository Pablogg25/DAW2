// ======== FUNCIÓN PARA CALCULAR FACTORIAL ========

function calcularFactorial(num) {
  let resultado = 1;
  let desarrollo = "";

  for (let i = num; i >= 1; i--) {
    resultado *= i; // multiplica el resultado por i

    // añadimos al texto (sin "x" después del último número)
    desarrollo += i;
    if (i > 1) {
      desarrollo += "x";
    }
  }

  desarrollo += "=" + resultado;

  return desarrollo;
}

// ======== CÓDIGO AUXILIAR PARA PROBAR ========

let continuar = true;

while (continuar) {
  let numero = parseInt(
    prompt("Introduce un número para calcular su factorial:")
  );

  if (isNaN(numero) || numero < 0) {
    alert("⚠️ Debes introducir un número entero mayor o igual que 0.");
  } else {
    let resultado = calcularFactorial(numero);
    alert("📘 Resultado:\n" + resultado);
    console.log(resultado);
  }

  continuar = confirm("¿Quieres calcular otro factorial?");
}

alert("Programa terminado. 👋");
