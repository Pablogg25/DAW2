<?php


function cargar()
{
    $array1 = range(1, 40, 2);
    $array2 = range(0, 40, 2);

    shuffle($array1);
    shuffle($array2);
    $arrayFinal = array_merge($array1, $array2);
    sort($arrayFinal);
    return $arrayFinal;
};

$array = cargar();
echo implode(", ", $array);
