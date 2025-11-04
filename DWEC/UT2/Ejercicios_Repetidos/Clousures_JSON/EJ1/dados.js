// ====== CLOSURE ======
function jugarDados(numeroLados) {
  // Función interna para un dado
  function tirarUnDado() {
    return Math.floor(Math.random() * numeroLados) + 1;
  }

  // La función que devolvemos (closure)
  return function () {
    return [tirarUnDado(), tirarUnDado()];
  };
}

//Probamos el clousure
// 1
let numeroLados = prompt("¿Cuantos lados tendran vuestros dados?");
let numeroTiradas = prompt("¿Cuantas tiradas quieres realizar?");
// 2
let tirarDados = jugarDados(numeroLados);
// 3
let victoriasJugador = 0;
let victoriasMaquina = 0;

for (let i = 0; i < numeroTiradas; i++) {
  let jugador = tirarDados();
  let maquina = tirarDados();

  let sumaJugador = jugador[0] + jugador[1];
  let sumaMaquina = maquina[0] + maquina[1];
  alert(
    `Tirada ${i + 1}\nJugador: ${jugador[0]} + ${
      jugador[1]
    } = ${sumaJugador}\n` +
      `Máquina: ${maquina[0]} + ${maquina[1]} = ${sumaMaquina}`
  );

  if (sumaJugador > sumaMaquina) victoriasJugador++;
  else if (sumaMaquina > sumaJugador) victoriasMaquina++;
}
// Resultado final
alert(
  `Resultado final:\nJugador: ${victoriasJugador} victorias\n` +
    `Máquina: ${victoriasMaquina} victorias`
);
