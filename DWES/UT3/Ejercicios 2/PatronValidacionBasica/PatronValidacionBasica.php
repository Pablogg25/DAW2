<?php

// patrón de validación y saneamiento de datos: filter_input() (filtro de validación y saneamiento). 
//Devuelve el valor limpio (y casteado) o false si no es válido, o null si no se envió el campo.

$edad = filter_input(
    INPUT_POST,
    'edad',
    FILTER_VALIDATE_INT
);

if ($edad === null) {

    echo "No se envió el campo";

}
elseif ($edad === false) {

    echo "Se envió pero es inválido";

}
else {

    echo "Edad válida: $edad";

}