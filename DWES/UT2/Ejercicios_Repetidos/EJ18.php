<?php

$nombre = "Pablo";

function Devuelve()
{
    return $GLOBALS['nombre'];
}

echo Devuelve();
