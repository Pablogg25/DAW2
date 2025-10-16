<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $mi_entero = 3;
    $mi_real = 2.3;
    $resultado = $mi_entero + $mi_real;
    echo $resultado;
    echo '<br>La variable $resultado es de tipo ' . gettype($resultado);
    ?>
</body>

</html>