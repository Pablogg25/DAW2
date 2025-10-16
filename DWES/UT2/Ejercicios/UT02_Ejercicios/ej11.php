<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $integer = (int)25;
    $double = (float)35.6;
    $string = (string)'Hola';
    $boolean = (bool) true;
    echo isset($integer);
    echo isset($double);
    echo isset($string);
    echo isset($boolean);
    ?>
</body>

</html>