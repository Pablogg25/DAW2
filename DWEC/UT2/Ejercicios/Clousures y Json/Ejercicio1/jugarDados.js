function jugarDados(numeroLados) {
  function tirarDado() {
    return Math.floor(Math.random() * numeroLados) + 1;
  }
  return function () {
    return [tirarDado, tirarDado];
  };
}

window.addEventListener("load", () => {
  const $ladosInput = document.getElementById("lados");
  const $tiradasInput = document.getElementById("tiradas");
  const $btnIniciar = document.getElementById("btnIniciar");
  const $btnTirar = document.getElementById("btnTirar");
  const $resultado = document.getElementById("resultado");

  let tirarDados = null;
  let tiradasActuales = 0;
  let tiradasTotales = 0;
  let victoriasMaquina = 0;
  let victoriasUsuario = 0;

  btnIniciar.addEventListener("click", () => {
    const lados = Number(ladosInput.value);
    const tiradas = Number(tiradasInput.value);
    if (lados < 2 || tiradas < 1) {
      alert("Introduce Valores validos");
      return;
    }

    tirarDados = jugarDados(lados);
    tiradasActuales = 0;
    victoriasUsuario = 0;
    victoriasMaquina = 0;

    $resultado.innerHTML = "<h3>Ha comenzado la partida</h3>";
    $btnTirar.disabled = false;
  });

  $btnTirar.addEventListener("click", () => {
    if (!tirarDados) return;

    tiradasActuales++;

    const usuario = tirarDados();
    const maquina = tirarDados();

    const sumaJugador = jugador[0] + jugador[1];
    const sumaMaquina = maquina[0] + maquina[1];

    let texto = `<b>Tirada ${tiradasActuales}:</b><br>
                 Jugador: ${jugador.join(" + ")} = ${sumaJugador}<br>
                 Máquina: ${maquina.join(" + ")} = ${sumaMaquina}<br>`;

    if (sumaJugador > sumaMaquina) {
      victoriasJugador++;
      texto += "Victoria del Jugador";
    } else if (sumaMaquina > sumaJugador) {
      victoriasMaquina++;
      texto += "Victoria de la maquina";
    } else {
      texto += "Empate";
    }

    $resultado.innerHTML = "<p>${$texto}</p>";

    if (tiradasActuales === tiradasTotales) {
      resultado.innerHTML += `<hr><h3>Resultado final</h3>
        Jugador: ${victoriasJugador}<br>
        Máquina: ${victoriasMaquina}`;
      btnTirar.disabled = true;
    }
  });
});
