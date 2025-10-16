function dibujarRombo(h) {
    let forma = [];
    let mitad = (h - 1) / 2;
    // Parte superior y centro
    for (let i = 0; i <= mitad; i++) {
        let linea = '';
        for (let j = 0; j < mitad - i; j++) {
            linea += '_';
        }
        for (let k = 0; k < 2 * i + 1; k++) {
            linea += '*';
        }
        for (let j = 0; j < mitad - i; j++) {
            linea += '_';
        }
        forma[i] = linea;
    }
    // Parte inferior
    for (let i = mitad - 1; i >= 0; i--) {
        let linea = '';
        for (let j = 0; j < mitad - i; j++) {
            linea += '_';
        }
        for (let k = 0; k < 2 * i + 1; k++) {
            linea += '*';
        }
        for (let j = 0; j < mitad - i; j++) {
            linea += '_';
        }
        forma[h - 1 - i] = linea;
    }
    // Mostrar el rombo
    for (let i = 0; i < forma.length; i++) {
        console.log(forma[i]);
    }
}

dibujarRombo(7);