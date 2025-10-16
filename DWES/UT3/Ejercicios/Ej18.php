<?php
function areaTriangulo($base, $altura)
{
    $area = ($base * $altura) / 2;
    // Si el área es un número entero, lo devuelve como int, si no, como float
    return ($area == intval($area)) ? intval($area) : floatval($area);
}

// Ejemplo de uso:
$base = 5;
$altura = 4;
echo "El área del triángulo es: " . areaTriangulo($base, $altura);
