function recibeParametros(...array) {
  let arrayStrings = [];
  let arrayBoolean = [];
  let arrayNumber = [];
  let arrayUndefined = [];
  let arrayObject = [];

  for (let [index, elemento] of array.entries()) {
    switch (typeof elemento) {
      case "string":
        arrayStrings.push({ valor: elemento, posicion: index });
        break;
      case "boolean":
        arrayBoolean.push({ valor: elemento, posicion: index });
        break;
      case "number":
        arrayNumber.push({ valor: elemento, posicion: index });
        break;
      case "undefined":
        arrayUndefined.push({ valor: elemento, posicion: index });
        break;
      case "object":
        arrayObject.push({ valor: elemento, posicion: index });
        break;
    }
  }

  // Mostrar los resultados
  console.log("=== STRINGS ===");
  for (let item of arrayStrings) {
    console.log(`Posición ${item.posicion}: "${item.valor}"`);
  }

  console.log("\n=== BOOLEANOS ===");
  for (let item of arrayBoolean) {
    console.log(`Posición ${item.posicion}: ${item.valor}`);
  }

  console.log("\n=== NÚMEROS ===");
  for (let item of arrayNumber) {
    console.log(`Posición ${item.posicion}: ${item.valor}`);
  }

  console.log("\n=== UNDEFINED ===");
  for (let item of arrayUndefined) {
    console.log(`Posición ${item.posicion}: ${item.valor}`);
  }

  console.log("\n=== OBJETOS ===");
  for (let item of arrayObject) {
    console.log(`Posición ${item.posicion}: ${JSON.stringify(item.valor)}`);
  }
}

// ==== CÓDIGO AUXILIAR PARA PROBAR ====
recibeParametros("Hola", true, 42, undefined, "Adiós", false, {
  nombre: "Pepe",
});
