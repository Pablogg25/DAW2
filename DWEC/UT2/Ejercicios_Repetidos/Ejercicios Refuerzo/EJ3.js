let letras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

let morse = [
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
  "-----",
  ".----",
  "..---",
  "...--",
  "....-",
  ".....",
  "-....",
  "--...",
  "---..",
  "----.",
];

function morseConverter(input) {
  // Detectar si es morse (contiene '.' o '-')
  let esMorse = false;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "." || input[i] === "-") {
      esMorse = true;
      break;
    }
  }

  // ========= DECODIFICAR MORSE → TEXTO =========
  if (esMorse) {
    let palabra = "";
    let simbolo = "";
    let resultado = "";

    for (let i = 0; i <= input.length; i++) {
      let c = input[i];

      if (c !== " " && c !== undefined) {
        simbolo += c;
      } else {
        // fin símbolo
        if (simbolo !== "") {
          // buscar simbolo en tabla
          for (let j = 0; j < morse.length; j++) {
            if (morse[j] === simbolo) {
              palabra += letras[j];
            }
          }
          simbolo = "";
        }

        // detectar 2 espacios → fin palabra
        if (input[i + 1] === " ") {
          resultado += palabra + " ";
          palabra = "";
          i++;
        }
      }
    }
    resultado += palabra;
    return resultado;
  }

  // ========= CODIFICAR TEXTO → MORSE =========
  let resultado = "";
  for (let i = 0; i < input.length; i++) {
    let letra = input[i].toUpperCase();

    if (letra === " ") {
      resultado += "  "; // espacio entre palabras
      continue;
    }

    // buscar letra en tabla
    for (let j = 0; j < letras.length; j++) {
      if (letras[j] === letra) {
        resultado += morse[j];
        break;
      }
    }

    // añadir espacio entre símbolos
    if (i < input.length - 1 && input[i + 1] !== " ") {
      resultado += " ";
    }
  }
  return resultado;
}

console.log(morseConverter(".... --- .-.. .-"));
