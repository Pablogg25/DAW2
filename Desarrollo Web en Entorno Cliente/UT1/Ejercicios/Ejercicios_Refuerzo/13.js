function dibujarZelda(n) {
    // Triángulo superior
    for (let i = 1; i <= n; i++) {
        let linea = '';
        // Espacios a la izquierda
        for (let j = 1; j <= n - i; j++) {
            linea += ' ';
        }
        // Asteriscos
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea += '*';
        }
        console.log(linea);
    }

    // Triángulos inferiores (izquierdo y derecho)
    for (let i = 1; i <= n; i++) {
        let linea = '';
        // Espacios a la izquierda
        for (let j = 1; j <= n - i; j++) {
            linea += ' ';
        }
        // Triángulo izquierdo
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea += '*';
        }
        // Espacio entre los dos triángulos
        linea += ' ';
        // Triángulo derecho
        for (let j = 1; j <= 2 * i - 1; j++) {
            linea += '*';
        }
        console.log(linea);
    }
}

// Ejemplo
dibujarZelda(3);
