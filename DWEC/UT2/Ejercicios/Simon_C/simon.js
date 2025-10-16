// ========================================================
// FUNCION LOG: muestra mensajes en tabla debajo del juego
// ========================================================
let logContador = 1;
function log(msg) {
  const tbody = document.getElementById("log");
  if (tbody) {
    const fila = document.createElement("tr");
    const celdaN = document.createElement("td");
    const celdaM = document.createElement("td");
    celdaN.textContent = logContador++;
    celdaM.textContent = msg;
    fila.appendChild(celdaN);
    fila.appendChild(celdaM);
    tbody.appendChild(fila);
    tbody.scrollTop = tbody.scrollHeight; // baja al final
  }
  console.log(msg); // opcional: mantener en consola
}

// ========================================================
// LÓGICA DEL JUEGO - FUNCIÓN AUTOINVOCADA
// ========================================================
const simon = (function() {
  const colores = ["verde", "rojo", "azul", "amarillo"];
  let secuencia = [];
  let posicion = 0;
  let mejorRacha = 0;
  let estado = "parado"; // "parado" | "mostrando" | "jugando"

  function obtenerSecuencia() { return secuencia.slice(); }
  function obtenerEstado() { return estado; }
  function obtenerPosicion() { return posicion; }
  function obtenerMejorRacha() { return mejorRacha; }

  function iniciarJuego() {
    if (estado === "jugando" || estado === "mostrando") {
      log("Intento de iniciar mientras está en curso.");
      return;
    }
    secuencia = [];
    posicion = 0;
    log("🔄 Juego iniciado. Mejor racha actual: " + mejorRacha);
    nuevaRonda();
  }

  function establecerColorPulsado(color) {
    if (estado !== "jugando") return;

    if (color === secuencia[posicion]) {
      posicion++;
      log("✅ Pulsado correcto: " + color);
      if (posicion === secuencia.length) {
        mejorRacha = Math.max(mejorRacha, secuencia.length);
        log("🎯 Ronda completada. Nueva racha: " + secuencia.length);
        estado = "parado";
        posicion = 0;
        setTimeout(nuevaRonda, 800);
      }
    } else {
      log("❌ Error: esperado " + secuencia[posicion] + ", recibido " + color);
      alert("¡Has fallado!");
      secuencia = [];
      posicion = 0;
      estado = "parado";
    }
  }

  function nuevaRonda() {
    const nuevo = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(nuevo);
    posicion = 0;
    estado = "mostrando";
    log("➡️ Nueva ronda. Secuencia: " + secuencia.join(", "));
    mostrarSecuencia();
  }

  function mostrarSecuencia() {
    const tiempoOn = Number(document.getElementById("tiempoOn").value);
    const tiempoOff = Number(document.getElementById("tiempoOff").value);
    const sec = secuencia.slice();
    let i = 0;

    function iluminar(color) {
      const btn = document.getElementById(color);
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), tiempoOn);
    }

    function siguiente() {
      if (i < sec.length) {
        iluminar(sec[i]);
        log("💡 Iluminando: " + sec[i]);
        i++;
        setTimeout(siguiente, tiempoOn + tiempoOff);
      } else {
        estado = "jugando";
        log("🕹️ Fin de la secuencia. Esperando pulsaciones...");
      }
    }
    siguiente();
  }

  return {
    iniciarJuego,
    establecerColorPulsado,
    obtenerEstado,
    obtenerPosicion,
    obtenerSecuencia,
    obtenerMejorRacha
  };
})();

// ========================================================
// INTERFAZ GRÁFICA
// ========================================================
window.addEventListener("load", () => {
  const botones = document.querySelectorAll(".color");
  const btnComenzar = document.getElementById("btnComenzar");
  const mejor = document.getElementById("mejorRacha");
  const progreso = document.getElementById("rachaActual");

  function iluminar(color, duracion = 200) {
    const boton = document.getElementById(color);
    boton.classList.add("active");
    setTimeout(() => boton.classList.remove("active"), duracion);
  }

  btnComenzar.addEventListener("click", () => {
    if (simon.obtenerEstado() === "jugando" || simon.obtenerEstado() === "mostrando") return;
    simon.iniciarJuego();
    mejor.textContent = simon.obtenerMejorRacha();
    progreso.textContent = "0 de 0";
  });

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      if (simon.obtenerEstado() !== "jugando") return;
      const color = btn.id;
      iluminar(color);
      simon.establecerColorPulsado(color);
      const pos = simon.obtenerPosicion();
      const total = simon.obtenerSecuencia().length;
      progreso.textContent = `${pos} de ${total}`;
      mejor.textContent = simon.obtenerMejorRacha();
    });
  });
});
