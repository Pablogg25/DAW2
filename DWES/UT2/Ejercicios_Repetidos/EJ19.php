<?php


function contador()
{
    static $contador = 0;
    $contador++;
    return $contador;
}

contador();
contador();
contador();

echo contador();
