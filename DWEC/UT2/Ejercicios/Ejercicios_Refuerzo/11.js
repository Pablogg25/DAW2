function encontrarPerdidos(...numeros) {
    let resultados = [];
    let minimo = 0;
    let maximo = 0;
    if (numeros.length === 0) {
        return [];
    }
    minimo = numeros[0];
    maximo = numeros[0];
    for (let i = 1; i < numeros.length; i++) {

        if (numeros[i] < minimo) {
            minimo = numeros[i];
        }
        if (numeros[i] > maximo) {
            maximo = numeros[i];
        }

    }

    let encontrado = false;
    for (let i = minimo + 1; i < maximo; i++) {
        let encontrado = false;
        for (let j = 0; j < numeros.length; j++) {
            if (numeros[i] === numeros[j]) {
                encontrado = true;
                break;
            } if (!encontrado) {
                resultados[resultados.length] = i;

            }
        }
    }
    return resultados;
}
console.log(encontrarPerdidos(1, 2, 5, 6, 8, 10, 14));