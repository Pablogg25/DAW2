<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    require "Ej11.php";
    // Ejemplo de uso:
    /*$texto = "Hola mundo, hola universo, hola galaxia";
    $palabra = "hola";
    $posicion = encontrarUltimaPosicion($texto, $palabra);
    echo "La última aparición de '$palabra' está en la posición: $posicion";
    */
    // Ejemplo de uso:
    $texto1 = "Hola";
    $texto2 = "hola";
    if (sonCadenasIguales($texto1, $texto2)) {
        echo "Las cadenas son exactamente iguales.";
    } else {
        echo "Las cadenas son diferentes.";
    } ?>
</body>

</html>