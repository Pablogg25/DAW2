<?php
$cadena = 'Hola me llamo Pablo';
function empiezaCadena($cadena, $palabra)
{
    return stripos($cadena, $palabra) === 0;
}
// Ejemplo de uso:
if (empiezaCadena($cadena, 'hola')) {
    echo "La cadena comienza con la palabra 'hola'.";
} else {
    echo "La cadena NO comienza con la palabra 'hola'.";
}
