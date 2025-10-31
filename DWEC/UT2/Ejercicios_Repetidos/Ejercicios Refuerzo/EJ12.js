function escalera(n) {
  if (n === 0) {
    console.log("__");
    return;
  }

  // Escalera positiva
  if (n > 0) {
    for (let i = n; i > 0; i--) {
      let linea = "";

      for (let j = 1; j < i; j++) {
        linea += " ";
      }

      linea += i === 1 ? "_" : "_|";
      console.log(linea);
    }
    return;
  }

  // Escalera negativa
  if (n < 0) {
    n = -n;
    for (let i = 1; i <= n; i++) {
      let linea = "";

      for (let j = 1; j < i; j++) {
        linea += " ";
      }

      linea += i === n ? "_" : "|_";
      console.log(linea);
    }
  }
}

escalera(4);
console.log("------");
escalera(-4);
console.log("------");
escalera(0);
