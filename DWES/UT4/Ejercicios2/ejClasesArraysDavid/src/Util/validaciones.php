<?php
declare(strict_types=1);
require_once('index.php');


function validaNombre(string $nombre,&$erroresNombre):bool{
    if($nombre===""){
        $erroresNombre[]="El nombre está vacío.";
        return false;
    }
    return true;
}

function validaPrecio($precio, &$erroresPrecio):bool{
    if(!is_numeric($precio)){
        $erroresPrecio[]="Debes introducir un número.";
    }
    if($precio<0){
        $erroresPrecio[]="No es posible que sea negativo.";
    }
    if(!empty($erroresPrecio))return false;
    else return true;
}

function validaCantidad($cantidad,&$erroresCantidad):bool{
    if(!is_numeric($cantidad)){
        $erroresCantidad[]="Debes introducir un número.";
    }
    if($cantidad<=0){
        $erroresCantidad[]="La cantidad no puede ser negativa o cero.";
    }
    if(!empty($erroresCantidad))return false;
    else return true;
}

?>