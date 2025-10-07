function dibujarZelda(n) {
    let espacio = ' ';
    // Triángulo superior
    for (let i = 1; i <= n; i++) {
        let linea = '';
        // Espacios a la izquierda
        for (let j = 1; j <= n - i; j++) {
            linea = linea.concat(espacio); // concat correcto
        }
        // Asteriscos
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea = linea.concat('*');
        }
        console.log(linea);
    }

    // Triángulos inferiores (izquierdo y derecho)
    for (let i = 1; i <= n; i++) {
        let linea = '';
        // Espacios a la izquierda
        for (let j = 1; j <= n - i; j++) {
            linea = linea.concat(espacio);
        }
        // Triángulo izquierdo
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea = linea.concat('*');
        }
        // Espacio entre triángulos
        linea = linea.concat(' ');
        // Triángulo derecho
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea = linea.concat('*');
        }
        console.log(linea);
    }
}

// Ejemplo
dibujarZelda(3);
