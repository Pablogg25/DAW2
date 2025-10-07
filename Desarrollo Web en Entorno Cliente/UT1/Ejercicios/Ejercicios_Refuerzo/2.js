function fibonacci(n) {
    let fibonacci = [];
    let contador = 0;
    if (n > 0) fibonacci.push(0);
    if (n > 1) fibonacci.push(1);
    contador = fibonacci.length;
    while (contador < n) {
        fibonacci.push(fibonacci[contador - 1] + fibonacci[contador - 2]);
        contador++;
    }
    return fibonacci;
}

console.log(fibonacci(1));