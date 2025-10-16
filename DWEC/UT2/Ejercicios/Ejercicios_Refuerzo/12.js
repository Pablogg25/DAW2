function escalera(altura) {

    if (altura === 0) {
        console.log("__")
        return;
    }
    //Escalera ascendente
    if (altura > 0) {
        for (let i = 0; i <= altura; i++) {
            let linea = "";
            for (let j = altura - i; j > 0; j--) {
                linea += " ";
            }
            linea += "_|";
            console.log(linea)
        }
    }
    if (altura < 0) {
        for (let i = 0; i > altura; i--) {
            let linea = "";
            // Espacios a la izquierda (crecen en cada escalón)
            for (let j = 0; j < -i; j++) {
                linea += " ";
            }
            linea += "|_";
            console.log(linea);
        }
    }
}

//Ejemplo
console.log("Escalera +4:");
escalera(4);

console.log("\nEscalera -4:");
escalera(-4);

console.log("\nEscalera 0:");
escalera(0);