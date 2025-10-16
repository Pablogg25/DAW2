// simon.js - CORREGIDO: mostrarSecuencia definido en el mismo scope
// ================================================================

const simon = (function() {
  const colores = ["verde", "rojo", "azul", "amarillo"];
  let secuencia = [];
  let posicion = 0;
  let mejorRacha = 0;
  // estado puede ser: "parado", "mostrando", "jugando"
  let estado = "parado";

  function obtenerSecuencia() { return secuencia.slice(); }
  function obtenerEstado() { return estado; }
  function obtenerPosicion() { return posicion; }
  function obtenerMejorRacha() { return mejorRacha; }

  // iniciar juego: reinicia secuencia y lanza la primera ronda
  function iniciarJuego() {
    if (estado === "jugando" || estado === "mostrando") {
      console.log("No se puede iniciar: ya está en curso.", estado);
      return;
    }
    secuencia = [];
    posicion = 0;
    console.log("Iniciando juego. Mejor racha previa:", mejorRacha);
    nuevaRonda();
  }

  function establecerColorPulsado(color) {
    if (estado !== "jugando") {
      // ignorar pulsaciones si no toca
      return;
    }

    console.log("Pulsado:", color, "esperado:", secuencia[posicion]);
    if (color === secuencia[posicion]) {
      posicion++;
      // actualiza mejor racha en la interfaz (la interfaz leerá getMejor)
      if (posicion === secuencia.length) {
        // completada la secuencia
        mejorRacha = Math.max(mejorRacha, secuencia.length);
        estado = "parado";
        posicion = 0;
        console.log("Ronda completada. Mejor racha ahora:", mejorRacha);
        // nueva ronda tras un pequeño retraso
        setTimeout(nuevaRonda, 800);
      }
    } else {
      // fallo
      console.log("Fallo en la posición", posicion);
      alert("❌ ¡Has fallado! Secuencia reiniciada.");
      secuencia = [];
      posicion = 0;
      estado = "parado";
    }
  }

  function nuevaRonda() {
    // añadimos un color aleatorio y mostramos la secuencia
    const nuevo = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(nuevo);
    posicion = 0;
    estado = "mostrando";
    console.log("Nueva ronda. Secuencia:", secuencia);
    // llamar a la función que ilumina la secuencia (privada)
    mostrarSecuencia();
  }

  // ---------- mostrarSecuencia: privada dentro del closure ------------
  // Se apoya en elementos DOM para leer tiempos y manipular botones.
  function mostrarSecuencia() {
    const tiempoOnInput = document.getElementById("tiempoOn");
    const tiempoOffInput = document.getElementById("tiempoOff");

    const tiempoOn = tiempoOnInput ? Number(tiempoOnInput.value) : 600;
    const tiempoOff = tiempoOffInput ? Number(tiempoOffInput.value) : 300;

    const sec = secuencia.slice(); // copia
    let i = 0;

    console.log("Mostrando secuencia, tiempoOn:", tiempoOn, "tiempoOff:", tiempoOff);

    function iluminar(color) {
      const btn = document.getElementById(color);
      if (!btn) return;
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), tiempoOn);
    }

    function siguiente() {
      if (i < sec.length) {
        iluminar(sec[i]);
        i++;
        setTimeout(siguiente, tiempoOn + tiempoOff);
      } else {
        // terminado de mostrar la secuencia: pasar a estado de juego
        estado = "jugando";
        console.log("Fin mostrar secuencia. Estado -> 'jugando'");
      }
    }

    // arrancar la reproducción
    siguiente();
  }
  // -------------------------------------------------------------------

  // Exponer sólo lo necesario
  return {
    iniciarJuego,
    establecerColorPulsado,
    obtenerEstado,
    obtenerPosicion,
    obtenerSecuencia,
    obtenerMejorRacha
  };
})();

// ==================== Interfaz (fuera del closure) ====================
window.addEventListener("load", () => {
  const botones = document.querySelectorAll(".color");
  const btnComenzar = document.getElementById("btnComenzar");
  const mejorEl = document.getElementById("mejorRacha");
  const progresoEl = document.getElementById("rachaActual");

  function iluminarVisual(color, duracion = 200) {
    const el = document.getElementById(color);
    if (!el) return;
    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), duracion);
  }

  // evento para empezar
  btnComenzar.addEventListener("click", () => {
    // evitar doble inicio
    if (simon.obtenerEstado() === "jugando" || simon.obtenerEstado() === "mostrando") {
      console.log("Ya en progreso, ignorando comenzar.");
      return;
    }
    simon.iniciarJuego();
    mejorEl.textContent = simon.obtenerMejorRacha();
    progresoEl.textContent = "0 de 0";
  });

  // clicks en colores
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      // si no estamos en 'jugando' ignorar
      if (simon.obtenerEstado() !== "jugando") return;
      const color = btn.id;
      iluminarVisual(color, 200);            // feedback inmediato
      simon.establecerColorPulsado(color);   // lógica del juego
      // actualizar progreso / mejor racha
      const pos = simon.obtenerPosicion();
      const total = simon.obtenerSecuencia().length;
      progresoEl.textContent = `${pos} de ${total}`;
      mejorEl.textContent = simon.obtenerMejorRacha();
    });
  });
});
