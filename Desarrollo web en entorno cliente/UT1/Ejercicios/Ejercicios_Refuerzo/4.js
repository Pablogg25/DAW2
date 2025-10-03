function estaEquilibrada(expresion) {
    const pila = [];
    const pares = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let char of expresion) {
        if (char === '(' || char === '[' || char === '{') {
            pila.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (pila.length === 0) return false;
            const ultimo = pila.pop();
            if (pares[ultimo] !== char) return false;
        }
    }
    return pila.length === 0;
}

// Ejemplos de uso:
console.log(estaEquilibrada('{ [ a * ( c + d ) ] - 5 }')); // true
console.log(estaEquilibrada('{ a * ( c + d ) ] - 5 }'));   // false