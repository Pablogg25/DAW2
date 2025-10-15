function Marco(frase) {
    let palabras = frase.split(" ");

    let maxLong = 0;
    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > maxLong) {
            maxLong = palabras[i].length;
        }
    }

    let borde = "";
    for (let i = 0; i < maxLong + 4; i++) {
        borde += "*";
    }
    console.log(borde);

    for (let i = 0; i < palabras.length; i++) {
        let palabra = palabras[i];
        let espacios = "";
        for (let j = palabra.length; j < maxLong; j++) {
            espacios += " ";
        }
        console.log("* " + palabra + espacios + " *")
    }
    console.log(borde);
}

//Ejemplo
Marco("¿que le parece el reto?");