function contiene(arr, valor) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === valor) return true;
  }
  return false;
}

function conjuntos(arr1, arr2, operacion) {
  let resultado = [];

  if (operacion === "unión") {
    // añadir arr1
    for (let i = 0; i < arr1.length; i++) {
      if (!contiene(resultado, arr1[i])) {
        resultado[resultado.length] = arr1[i];
      }
    }
    // añadir arr2
    for (let i = 0; i < arr2.length; i++) {
      if (!contiene(resultado, arr2[i])) {
        resultado[resultado.length] = arr2[i];
      }
    }
  } else if (operacion === "intersección") {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j] && !contiene(resultado, arr1[i])) {
          resultado[resultado.length] = arr1[i];
        }
      }
    }
  } else if (operacion === "diferencia") {
    // primero buscamos intersección manualmente
    let comunes = [];
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j] && !contiene(comunes, arr1[i])) {
          comunes[comunes.length] = arr1[i];
        }
      }
    }

    // ahora añadimos arr1 - comunes
    for (let i = 0; i < arr1.length; i++) {
      if (!contiene(comunes, arr1[i]) && !contiene(resultado, arr1[i])) {
        resultado[resultado.length] = arr1[i];
      }
    }
  }

  return resultado;
}
