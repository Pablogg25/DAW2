function numerosPerdidos(array) {
  if (array.length < 2) return [];
  let maximo = array[0];
  let minimo = array[0];
  let faltan = [];
  //Encontramos el maximo y minimo
  for (let i = 0; i < array.length; i++) {
    let valor = array[i];
    if (valor > maximo) maximo = valor;
    if (valor < minimo) minimo = valor;
  }

  //Encontramos los numeros que faltan
  for (let i = minimo + 1; i < maximo + 1; i++) {
    let encontrado = false;
    for (let j = 0; j < array.length; j++) {
      if (array[j] === i) {
        encontrado = true;
        break;
      }
    }
    if (!encontrado) {
      faltan[faltan.length] = i;
    }
  }
  return faltan;
}
console.log(numerosPerdidos([3, 7, 1, 4])); // [2,5,6]
console.log(numerosPerdidos([10, 12])); // [11]
console.log(numerosPerdidos([5])); // []
console.log(numerosPerdidos([1, 2, 3])); // []
console.log(numerosPerdidos([9, 2, 4])); // [3,5,6,7,8]
