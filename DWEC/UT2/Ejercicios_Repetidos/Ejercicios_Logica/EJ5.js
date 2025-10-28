function dibujarRombo(n) {
  let rombo = [];

  for (let i = 1; i <= n; i += 2) {
    let linea = "";

    for (let esp = 1; esp <= (n - i) / 2; esp++) {
      linea += " ";
    }
    for (let ast = 1; ast <= i; ast++) {
      linea += "*";
    }
    rombo.push(linea);
  }

  for (let i = n - 2; i >= 1; i -= 2) {
    let linea = "";
    for (let esp = 1; esp <= (n - i) / 2; esp++) {
      linea += " ";
    }
    for (let ast = 1; ast <= i; ast++) {
      linea += "*";
    }
    rombo.push(linea);
  }
  return rombo;
}
let diagonal = parseInt(
  prompt("Introduce la diagonal del rombo (número impar):")
);

if (diagonal % 2 === 0) {
  alert(
    "Por favor, introduce un número impar para que el rombo quede simétrico."
  );
} else {
  let figura = dibujarRombo(diagonal);

  console.log("Rombo:");
  for (let linea of figura) {
    console.log(linea);
  }

  alert(figura.join("\n"));
}
