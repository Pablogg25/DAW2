<?php

$funciones = [
    function ($z) {
        return $z * 2;
    }
    ,
    function ($a) {
        return $a + 2;

    },
    function ($x) {
        if ($x > 2) {
            return $x - 2;
        } else {
            return 2 - $x;
        }
    }
];

foreach ($funciones as $funcion) {
    echo $funcion(5) . '<br>';
}