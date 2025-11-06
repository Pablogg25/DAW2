function jugarSimon() {
  const colores = ["rojo", "verde", "azul", "amarillo"];
  let secuencia = [];
  let nivel = 1;

  alert("¡Bienvenido al juego SIMON!");

  while (true) {
    let nuevoColor = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(nuevoColor);
    alert("Nivel " + nivel + "\nSecuencia: " + secuencia.join(", "));

    let respuesta = prompt(
      "Repite la secuencia separada por comas:"
    ).toLowerCase();
    if (respuesta !== secuencia.join(", ")) {
      alert("❌ Fallaste. La secuencia era: " + secuencia.join(", "));
      break;
    }

    alert("✅ Correcto. Pasas al siguiente nivel.");
    nivel++;
  }

  alert("Has alcanzado el nivel " + nivel);
}

jugarSimon();
