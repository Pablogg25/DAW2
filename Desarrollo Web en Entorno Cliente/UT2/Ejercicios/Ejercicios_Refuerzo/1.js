function sonAnagramas(palabra1, palabra2) {
    if (palabra1 === palabra2) return false;
    if (palabra1.length !== palabra2.length) return false;

    // Creamos un contador de letras para cada palabra
    let contador1 = {};
    let contador2 = {};

    for (let i = 0; i < palabra1.length; i++) {
        let letra1 = palabra1[i].toLowerCase();
        let letra2 = palabra2[i].toLowerCase();

        contador1[letra1] = (contador1[letra1] || 0) + 1;
        contador2[letra2] = (contador2[letra2] || 0) + 1;
    }

    // Comparamos los contadores
    for (let letra in contador1) {
        if (contador1[letra] !== contador2[letra]) {
            return false;
        }
    }
    return true;
}

// Ejemplo de uso:
console.log(sonAnagramas("roma", "amor")); // true
console.log(sonAnagramas("roma", "roma")); // false
console.log(sonAnagramas("roma", "ramo")); // true
console.log(sonAnagramas("coma", "maco")); // true
console.log(sonAnagramas("coma", "hola")); // false
