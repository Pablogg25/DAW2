function banderaEspaña(an, al) {
  let salida = "";
  let medio = Math.floor(al / 2);
  for (let i = 0; i < al; i++) {
    linea = "";
    let simbolo = i === medio ? "-" : "*";
    for (let j = 0; j < an; j++) {
      linea += simbolo;
    }
    salida += linea + "\n";
  }
  console.log(salida);
  alert(salida);
}
banderaEspaña(10, 15);
