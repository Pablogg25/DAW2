<?php
function analizarCadena($cadena)
{
    $longitud = strlen($cadena);
    $capitalizada = ucwords($cadena);
    return [
        'longitud' => $longitud,
        'capitalizada' => $capitalizada
    ];
}

// Ejemplo de uso:
$cadena = 'hola me llamo Pablo';
$resultado = analizarCadena($cadena);
echo "Longitud total: " . $resultado['longitud'] . "<br>";
echo "Versión capitalizada: " . $resultado['capitalizada'];
