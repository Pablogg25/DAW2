<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $mayoriaEdad = 18;
    $edad = 19;
    $resultado = ($edad >= $mayoriaEdad) ? "Es mayor de edad" : "No es mayor de edad";
    echo $resultado;
    ?>
</body>

</html>