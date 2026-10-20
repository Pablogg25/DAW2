<?php
$letrasDNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];


function calcularDNI($dni, $letrasDNI)
{
    if (is_int($dni) && $dni . strlen(9)) {
        $resto = $dni % 23;
        $letra = $letrasDNI[$resto];
    }
    return $letra;
};
$dni = 72220220;
echo "La letra de tu DNI es " . calcularDNI($dni, $letrasDNI);
