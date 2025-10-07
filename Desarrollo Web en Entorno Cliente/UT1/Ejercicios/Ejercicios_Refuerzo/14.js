(function () {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function cifrarTexto(texto, clave) {
        texto = texto.toUpperCase();
        let resultado = "";
        for (let i = 0; i < texto.length; i++) {
            let letra = texto[i];
            let index = alfabeto.indexOf(letra);
            if (index !== -1) {
                let nuevaPos = (index + clave) % 26;
                resultado += alfabeto[nuevaPos];
            } else {
                resultado += letra; // deja espacios y signos igual
            }
        }
        return resultado;
    }

    function descifrarTexto(texto, clave) {
        texto = texto.toUpperCase();
        let resultado = "";
        for (let i = 0; i < texto.length; i++) {
            let letra = texto[i];
            let index = alfabeto.indexOf(letra);
            if (index !== -1) {
                let nuevaPos = (index - clave + 26) % 26;
                resultado += alfabeto[nuevaPos];
            } else {
                resultado += letra;
            }
        }
        return resultado;
    }

    // Ejemplo de uso
    let textoPlano = "Hola Mundo";
    let clave = 3;

    let cifrado = cifrarTexto(textoPlano, clave);
    console.log("Texto cifrado:", cifrado);

    let descifrado = descifrarTexto(cifrado, clave);
    console.log("Texto descifrado:", descifrado);
})();
