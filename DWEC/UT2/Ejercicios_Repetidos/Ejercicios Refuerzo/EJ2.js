function fibonacci(n) {
  if (typeof n !== "number" || n <= 0 || Math.floor(n) !== n) {
    return [];
  }

  let resultado = new Array(n);

  if (n >= 1) resultado[0] = 0;
  if (n >= 1) resultado[1] = 1;

  for (let i = 2; i < n; i++) {
    let a = resultado[i - 1];
    let b = resultado[i - 2];

    resultado[i] = a + b;
  }
  return resultado;
}

console.log(fibonacci(1)); // [0]
console.log(fibonacci(2)); // [0, 1]
console.log(fibonacci(5)); // [0, 1, 1, 2, 3]
console.log(fibonacci(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fibonacci(0)); // []
console.log(fibonacci(-3)); // []
console.log(fibonacci(10)); // primeros 10 valores
