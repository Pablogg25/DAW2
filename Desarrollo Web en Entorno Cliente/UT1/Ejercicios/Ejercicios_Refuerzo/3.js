function Morse(Palabra) {
    const morseABC = {
        "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
        "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
        "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
        "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
        "Y": "-.--", "Z": "--..",
        "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
        "6": "-....", "7": "--...", "8": "---..", "9": "----."
    };

    // Invertimos el diccionario para decodificar
    const textoABC = {};
    for (let letra in morseABC) {
        textoABC[morseABC[letra]] = letra;
    }

    // Detecta si es morse (solo contiene . - y espacios)
    const esMorse = /^[.\-\s]+$/.test(Palabra);

    if (esMorse) {
        // Decodificar morse a texto
        return Palabra.trim().split("  ").map(
            palabra => palabra.split(" ").map(
                simbolo => textoABC[simbolo] || ""
            ).join("")
        ).join(" ");
    } else {
        // Codificar texto a morse
        return Palabra.toUpperCase().split(" ").map(
            palabra => palabra.split("").map(
                letra => morseABC[letra] || ""
            ).join(" ")
        ).join("  ");
    }
}

// Ejemplo de uso:
console.log(Morse("Hola Mundo")); // .... --- .-.. .-  -- ..- -. -.. ---
console.log(Morse(".... --- .-.. .-  -- ..- -. -.. ---")); // HOLA MUNDO