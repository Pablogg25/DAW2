function dibujarRombo(diagonal) {
    if (diagonal < 1 || diagonal % 2 === 0) {
        throw new Error('La diagonal debe ser un número impar mayor que 0');
    }
    const rombo = [];
    const mitad = Math.floor(diagonal / 2);
    for (let i = 0; i < diagonal; i++) {
        let espacios = Math.abs(mitad - i);
        let asteriscos = diagonal - 2 * espacios;
        rombo.push(' '.repeat(espacios) + '*'.repeat(asteriscos));
    }
    return rombo;
}

// Código de prueba
try {
    const diagonal = 7; // Cambia este valor para probar otros tamaños
    const resultado = dibujarRombo(diagonal);
    resultado.forEach(linea => console.log(linea));
} catch (e) {
    console.error(e.message);
}
