function dibujarRectangulo(alto, ancho) {
    let rectangulo = new Array(alto);

    for (let i = 0; i < alto; i++) {

        let linea = '';

        for (let j = 0; j < ancho; j++) {
            if (i === 0 || i === alto - 1 || j === 0 || j === ancho - 1) {
                linea += '*';
            } else {
                linea += ' ';
            } if (j === ancho - 1) {
                rectangulo[i] = linea;

            }

        }

    }
    return rectangulo;
}

console.log(dibujarRectangulo(7, 9));