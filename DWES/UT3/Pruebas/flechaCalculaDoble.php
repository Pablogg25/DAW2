<?php
//Ejercicio 4
$doble = fn($n) => $n * 2;
echo $doble(2) . '<br>';

//Ejercicio 5
$esPar = fn($n) => $n % 2 === 0 ? "true" : "false";
echo $esPar(2) . '<br>';
// Ejercicio 6
$cadenas = fn($texto1, $texto2) => strlen($texto1) >= strlen($texto2) ? $texto1 : $texto2;
echo $cadenas("php", "funciones") . '<br>';

// Ejercicio 9
function aplicar(array $datos, callable $fn): array
{
    $resultado = [];
    foreach ($datos as $elemento) {
        $resultado = $fn($elemento);
    }
    return $resultado;
}

print_r(aplicar([1, 2, 3, 4], fn($n) => $n * 10));