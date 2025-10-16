<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    $edad = 19;

    function funcion()
    {
        global $edad;
        return $edad;
    }
    echo funcion();
    ?>
</body>

</html>