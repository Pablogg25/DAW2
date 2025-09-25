function dibujarRectangulo(ancho, alto) {
    let rectanguloAlto = new Array(alto);


    for (let i = 0; i < alto; i++) {
        let linea = '';
        for (let j = 0; j < array.length; j++) {
            if (i === 0 || i === ancho - 1 || j === 0 || j === altura - 1) {
                linea += '*';
            } else {
                linea += ' ';
            }
            if (i === ancho - 1) {
                rectanguloAlto[i] = linea;
            }
        }

    }
    return rectanguloAlto;
}

dibujarRectangulo(10, 15);