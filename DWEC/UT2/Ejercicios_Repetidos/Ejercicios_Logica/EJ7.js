// =================== FUNCIONES ===================

// 1️⃣ Función que muestra una tabla de multiplicar
function tablaMultiplicar(numero) {
  let tabla = [];
  tabla.push(`Tabla del ${numero}:`);

  for (let i = 1; i <= 10; i++) {
    tabla.push(`${numero} x ${i} = ${numero * i}`);
  }

  // Unimos el array en líneas separadas
  alert(tabla.join("\n"));
  console.log(tabla.join("\n"));
}

// 2️⃣ Función que muestra todas las tablas entre dos números
function tablasMultiplicarEntre(num1, num2) {
  // Validación de rango
  if (num1 < 0 || num2 < 0 || num1 > 10 || num2 > 10) {
    alert("⚠️ Los números deben estar entre 0 y 10.");
    return;
  }

  // Determinar el orden correcto
  let inicio = Math.min(num1, num2);
  let fin = Math.max(num1, num2);

  // Generar todas las tablas
  for (let n = inicio; n <= fin; n++) {
    let tabla = [];
    tabla.push(`Tabla del ${n}:`);

    for (let i = 1; i <= 10; i++) {
      tabla.push(`${n} x ${i} = ${n * i}`);
    }

    alert(tabla.join("\n")); // mostramos cada tabla
    console.log(tabla.join("\n"));
  }
}

// =================== CÓDIGO AUXILIAR PARA PROBAR ===================

// Pedimos los dos números
let num1 = parseInt(prompt("Introduce el primer número (0 a 10):"));
let num2 = parseInt(prompt("Introduce el segundo número (0 a 10):"));

// Llamamos a la función principal
tablasMultiplicarEntre(num1, num2);
