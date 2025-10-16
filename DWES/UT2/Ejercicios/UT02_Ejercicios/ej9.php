<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    function ParImpar($numero): string
    {
        if ($numero % 2 == 0) {
            return 'El numero es par';
        } else {
            return 'El numero es impar';
        }
    }
    $entero = 10;
    $entero2 = 15;
    echo ParImpar($entero);
    echo '<br>';
    echo ParImpar($entero2);
    ?>
</body>

</html>