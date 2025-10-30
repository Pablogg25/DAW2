// ========== CREAR TABLERO ==========
let tablero = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function dibujarTablero(m) {
  let salida = "";

  for (let i = 0; i < 3; i++) {
    salida += m[i][0] + " | " + m[i][1] + " | " + m[i][2] + "\n";
    if (i < 2) salida += "=========\n";
  }
  console.log(salida);
}

//COMPROBAR DE ESTADO

function comprobarEstado(m) {
  // filas y columnas
  for (let i = 0; i < 3; i++) {
    if (m[i][0] && m[i][0] === m[i][1] && m[i][1] === m[i][2]) return m[i][0];
    if (m[0][i] && m[0][i] === m[1][i] && m[1][i] === m[2][i]) return m[0][i];
  }

  // diagonales
  if (m[0][0] && m[0][0] === m[1][1] && m[1][1] === m[2][2]) return m[0][0];
  if (m[0][2] && m[0][2] === m[1][1] && m[1][1] === m[2][0]) return m[0][2];

  // comprobar lleno
  let lleno = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (m[i][j] === "") lleno = false;
    }
  }

  return lleno ? "empate" : "";
}

//Poner maquina
function ponerMaquina(m, ficha) {
  let rival = ficha === "X" ? "O" : "X";

  // 1) intentar ganar
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (m[i][j] === "") {
        m[i][j] = ficha;
        if (comprobarEstado(m) === ficha) return; // deja la jugada
        m[i][j] = ""; // revertir
      }
    }
  // 2) bloquear al rival
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      if (m[i][j] === "") {
        m[i][j] = rival;
        if (comprobarEstado(m) === rival) {
          m[i][j] = ficha; // colocar para bloquear
          return;
        }
        m[i][j] = "";
      }
    }
  // 3) Aleatorio
  let vacias = [];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (m[i][j] === "") vacias.push([i, j]);

  let r = Math.floor(Math.random() * vacias.length);
  let pos = vacias[r];
  m[pos[0]][pos[1]] = ficha;
}
//Poner humano
function ponerHumano(m, x, y, ficha) {
  if (x < 0 || x > 2 || y < 0 || y > 2) return false;
  if (m[x][y] !== "") return false;
  m[x][y] = ficha;
  return true;
}
// Jugar
function jugar() {
  let humano = "X";
  let maquina = "O";

  // Elegir aleatoriamente quién empieza
  if (Math.random() < 0.5) {
    alert("Comienza la máquina");
    ponerMaquina(tablero, maquina);
  } else {
    alert("Comienza el humano (X)");
  }
  while (true) {
    dibujarTablero(tablero);

    // turno humano
    let x = parseInt(prompt("Fila (0-2):"));
    let y = parseInt(prompt("Columna (0-2):"));
    if (!ponerHumano(tablero, x, y, humano)) {
      alert("Movimiento inválido");
      continue;
    }

    if (comprobarEstado(tablero)) break;

    // turno máquina
    ponerMaquina(tablero, maquina);

    if (comprobarEstado(tablero)) break;
  }

  dibujarTablero(tablero);

  let estado = comprobarEstado(tablero);

  if (estado === "X") alert("¡Gana el humano!");
  else if (estado === "0") alert("¡Gana la máquina!");
  else alert("Empate");
}
jugar();
