function segundoMayor(array) {
  if (array.length < 2) return null;
  let mayor = 0;
  let segundoMayor = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > mayor) {
      segundoMayor = mayor;
      mayor = array[i];
    } // si no es el mayor pero es mayor que el segundo
    else if (array[i] > segundoMayor && array[i] !== mayor) {
      segundoMayor = array[i];
    }
  }
  return segundoMayor;
}

console.log(segundoMayor([4, 10, 7, 1])); // 7
console.log(segundoMayor([9, 9, 8])); // 8
console.log(segundoMayor([5])); // null
console.log(segundoMayor([1, 2])); // 1
console.log(segundoMayor([-5, -2, -9])); // -5
